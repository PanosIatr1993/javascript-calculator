class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      cache: "",
      display: "0",
      output: "",
      shouldFreezeInput: false };

    this.handleInput = this.handleInput.bind(this);
    this.calculate = this.calculate.bind(this);
    this.ConsecutiveAdditionsSubtractions = this.ConsecutiveAdditionsSubtractions.bind(this);
    this.ConsecutiveMultiplicationsDivisions = this.ConsecutiveMultiplicationsDivisions.bind(this);
    this.lengthError = this.lengthError.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  /*Handles new Inputs, performs Calculations(for both integers and decimals), manages sequential Operations*/
  handleInput(event) {
    const newInput = event.target.innerText;
    if (this.state.shouldFreezeInput) {
      return;
    }
    this.ConsecutiveAdditionsSubtractions(newInput);
    this.ConsecutiveMultiplicationsDivisions(newInput);
    this.lengthError();

    switch (newInput) {
      case "0":
        if (this.state.input === "") {
          this.setState({ input: "", cache: "" });
        } else {
          this.setState(prevState => ({
            input: prevState.input.concat(newInput),
            cache: prevState.cache.concat(newInput),
            display: prevState.cache.concat(newInput) }));

        }
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.setState(prevState => ({
          input: prevState.input.concat(newInput),
          cache: prevState.cache.concat(newInput),
          display: prevState.cache.concat(newInput) }));

        break;
      case "+":
        if (this.state.input === "") {
          break;
        }
        this.setState(prevState => ({
          input: prevState.input.concat(newInput),
          cache: "",
          display: "+" }));

        break;
      case "-":
        if (this.state.input === "") {
          break;
        }
        this.setState(prevState => ({
          input: prevState.input.concat(newInput),
          cache: "",
          display: "-" }));

        break;
      case "×":
        if (this.state.input === "") {
          break;
        }
        this.setState(prevState => ({
          input: prevState.input.concat("*"),
          cache: "",
          display: "×" }));

        break;
      case "÷":
        if (this.state.input === "") {
          break;
        }
        this.setState(prevState => ({
          input: prevState.input.concat("/"),
          cache: "",
          display: "÷" }));

        break;
      case "=":
        this.calculate();
        break;
      case ".":
        if (this.state.display.indexOf(".") == 1) {
          break;
        }
        this.setState(prevState => ({
          input: prevState.input.concat(newInput),
          cache: prevState.cache.concat(newInput),
          display: prevState.cache.concat(newInput) }));

        break;
      default:
        return;}


    this.lengthError();
  }

  /*Handles Equality and produces a Result. It also encloses negative Results in a parenthesis*/
  calculate() {
    const result = eval(this.state.input);
    let formattedResult = result;
    if (this.state.input.includes('/') && !Number.isInteger(result)) {
      formattedResult = result.toFixed(4); // Round division result to 4 decimal places
    }

    this.setState(prevState => ({
      cache: formattedResult.toString(),
      display: formattedResult.toString(),
      output: formattedResult.toString() }));

  }

  /*Produces a Result in Input Display automatically, when inserting a second Addition or Subtraction. It uses the calculate() function internally*/
  ConsecutiveAdditionsSubtractions(input) {
    if ((this.state.input.indexOf("+") !== -1 ||
    this.state.input.indexOf("-") !== -1 ||
    this.state.input.indexOf("*") !== -1 ||
    this.state.input.indexOf("/") !== -1) && (
    input === "+" || input === "-" || input === "×" || input === "÷")) {
      this.calculate();
      this.setState(prevState => ({
        input: prevState.display,
        cache: "",
        display: input }));

      return;
    }
  }

  /*Produces a Result in Input Display automatically, when inserting a second Multiplication or Division. It uses the calculate() function internally*/
  ConsecutiveMultiplicationsDivisions(input) {
    if ((this.state.input.indexOf("+") !== -1 ||
    this.state.input.indexOf("-") !== -1 ||
    this.state.input.indexOf("*") !== -1 ||
    this.state.input.indexOf("/") !== -1) && (
    input === "+" || input === "-" || input === "×" || input === "÷")) {
      this.calculate();
      if (input === "×") {
        this.setState(prevState => ({
          input: prevState.display,
          cache: "",
          display: input }));

      } else if (input === "÷") {
        this.setState(prevState => ({
          input: prevState.display,
          cache: "",
          display: input }));

      }
      return;
    }
  }

  /*Handles input overflow*/
  lengthError() {
    if (this.state.input.length > 27 || this.state.display.length > 27) {
      this.setState(prevState => ({
        display: "DIGIT LIMIT MET",
        shouldFreezeInput: true }));

    }
  }

  /*Clears Display and Calculator's internal state*/
  handleClear() {
    this.setState({
      input: "",
      cache: "",
      display: "0",
      output: "",
      shouldFreezeInput: false });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(CalculatorDisplay, { inputDisplay: this.state.input, resultDisplay: this.state.display }), /*#__PURE__*/
      React.createElement(CalculatorControl, { inputValue: this.handleInput, clear: this.handleClear })));


  }}


class CalculatorDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "screen" }, /*#__PURE__*/
      React.createElement("div", { id: "inputDisplay" }, this.props.inputDisplay), /*#__PURE__*/
      React.createElement("div", { id: "display" }, this.props.resultDisplay)));


  }}


class CalculatorControl extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container-fluid" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("button", { id: "seven", className: "col-md-3", onClick: this.props.inputValue }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "eight", className: "col-md-3", onClick: this.props.inputValue }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "nine", className: "col-md-3", onClick: this.props.inputValue }, "9"), /*#__PURE__*/
      React.createElement("button", { id: "add", className: "col-md-3", onClick: this.props.inputValue }, "+")), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("button", { id: "four", className: "col-md-3", onClick: this.props.inputValue }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "five", className: "col-md-3", onClick: this.props.inputValue }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "six", className: "col-md-3", onClick: this.props.inputValue }, "6"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", className: "col-md-3", onClick: this.props.inputValue }, "-")), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("button", { id: "three", className: "col-md-3", onClick: this.props.inputValue }, "3"), /*#__PURE__*/
      React.createElement("button", { id: "two", className: "col-md-3", onClick: this.props.inputValue }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "one", className: "col-md-3", onClick: this.props.inputValue }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", className: "col-md-3", onClick: this.props.inputValue }, "\xD7")), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("button", { id: "decimal", className: "col-md-3", onClick: this.props.inputValue }, "."), /*#__PURE__*/
      React.createElement("button", { id: "zero", className: "col-md-3", onClick: this.props.inputValue }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "clear", className: "col-md-3", onClick: this.props.clear }, "AC"), /*#__PURE__*/
      React.createElement("button", { id: "divide", className: "col-md-3", onClick: this.props.inputValue }, "\xF7")), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("button", { id: "equals", className: "col-md-9", onClick: this.props.inputValue }, "="))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById("calculator"));