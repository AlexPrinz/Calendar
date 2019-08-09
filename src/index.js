"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var CalendarView_1 = require("./CalendarView");
exports.CalendarView = CalendarView_1.CalendarView;
var MonthView_1 = require("./MonthView");
var WeekView_1 = require("./WeekView");
var View;
(function (View) {
    View[View["WEEK_VIEW"] = 0] = "WEEK_VIEW";
    View[View["MONTH_VIEW"] = 1] = "MONTH_VIEW";
})(View = exports.View || (exports.View = {}));
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._setRef = function (ref) {
            if (typeof _this.props.getCalendarRef === 'function') {
                _this.props.getCalendarRef(ref);
            }
        };
        return _this;
    }
    Calendar.prototype.getView = function () {
        if (this.props.view === View.MONTH_VIEW) {
            return (<MonthView_1["default"] {...this.props} ref={this._setRef}/>);
        }
        else if (this.props.view === View.WEEK_VIEW) {
            return (<WeekView_1["default"] {...this.props} ref={this._setRef}/>);
        }
        return (<MonthView_1["default"] {...this.props} ref={this._setRef}/>);
    };
    Calendar.prototype.render = function () {
        return this.getView();
    };
    return Calendar;
}(React.Component));
exports["default"] = Calendar;
