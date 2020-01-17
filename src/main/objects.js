
function FM_function(parameters) {
    this.parameters = parameters;
}

function FM_let(expressions, calculation) {
    this.expressions = expressions;
    this.calculation = calculation;
}

function FM_while(initial_variables, condition, logic, result) {
    this.initial_variables = initial_variables;
    this.condition = condition;
    this.logic = logic;
    this.result = result;
}

function FM_field_reference(field_reference) {
    this.table = field_reference;
    this.field = field_reference;
}

function FM_variable(variable) {
    this.variable = variable;
}

function FM_value(value) {
    this.value = value;
}