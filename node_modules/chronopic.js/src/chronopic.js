(function() {
	"use strict";

	// Function used to check if a variable is a valid number
	function isNum(value) {
		return (typeof value == "number" && !isNaN(value) && Math.abs(value) < Infinity);
	}

	// Object.assign polyfill
	("function" != typeof Object.assign && (Object.assign = function(target) {
		if(undefined === target || null === target) {
			throw new TypeError("Cannot convert undefined or null to object");
		}

		var output = Object(target), index, source, key;

		for(index = 1; index < arguments.length; ++index) {
			if(undefined !== (source = arguments[index]) && null !== source) {
				for(key in source) {
					(source.hasOwnProperty(key) && (output[key] = source[key]));
				}
			}
		}

		return output;
	}));

	// DOM Element helper class for easy DOM manipulation
	function Element(selector, options) {
		options = Object.assign({
			appendTo:      null,
			context:       document,
			html:          "",
			insertAfter:   null,
			insertBefore:  null,
			replace:       null
		}, options);

		var a, parsed, elem = (selector instanceof HTMLElement ? selector : null);

		if("string" == typeof selector) {
			parsed = (function(selector, parsed) {
				selector.match(/(\[[^\]]+\]|#[^#.\[]+|\.[^#.\[]+|\w+)/g)
				.forEach(function(m) {
					(m[0] == "[" ? ((m = m.match(/^\[([^=\]]+)=?([^\]]+)?\]$/)) && (parsed.attribs[m[1]] = m[2] || "")) : // Attribute
					(m[0] == "." ? parsed.classes.push(m.substr(1)) : // Class
					(m[0] == "#" ? (parsed.attribs.id = m.substr(1)) : // ID
					(parsed.tag = m)))); // Tag
				});
				return parsed;
			})(selector, { attribs: {}, classes: [] });

			// Create element from parsed string
			elem = options.context.createElement(parsed.tag);

			// Add classes
			parsed.classes.forEach(function(className) {
				elem.classList.add(className);
			});

			// Add attributes
			for(a in parsed.attribs) {
				(parsed.attribs.hasOwnProperty(a) && elem.setAttribute(a, parsed.attribs[a]));
			}
		}

		(this.element = elem).innerHTML = options.html;
		this.parent = null;
		this.events = {};

		// Add element to DOM
		if(options.replace) {
			options.replace.parentNode.replaceChild(elem, options.replace);
		} else if(options.appendTo) {
			(this.parent = options.appendTo).element.appendChild(elem);
		} else if(options.insertAfter) {
			options.insertAfter.parentNode.insertBefore(elem, options.insertAfter.nextSibling);
		} else if(options.insertBefore) {
			options.insertBefore.parentNode.insertBefore(elem, options.insertBefore);
		}

		return this;
	}

	Element.prototype = {
		add: function(elements, clear) {
			(clear === true && (this.clear()));

			(elements instanceof Array ? elements : [ elements ])
			.forEach(function(element) {
				this.element.appendChild(element.element);
				element.parent = this;
			}, this);

			return this;
		},
		get classes() {
			return this.element.classList;
		},
		clear: function() {
			var elem = this.element, child;

			while((child = elem.firstChild)) {
				elem.removeChild(child);
			}

			return this;
		},
		on: function(events, callback) {
			(events instanceof Array ? events : [ events ])
			.forEach(function(event) {
				var self = this, fn = (typeof callback == "function" ? function(e) { return callback.call(self, e); } : null);
				(self.events[event] instanceof Array || (self.events[event] = []));

				if(fn) {
					self.events[event].push(fn);
					self.element.addEventListener(event, fn);
				} else {
					self.events[event].forEach(function(callback) { self.element.removeEventListener(event, callback); });
					self.events[event] = [];
				}
			}, this);
			return this;
		}
	};

	// JavaScript Date object wrapper for additional functionality
	function δ(date) {
		return {
			// Function used to compare date objects and return a number between 0 (unequal) and 6 (equal to the second)
			compare: function(arg) {
				var result = 0, f, fragments = [ "getFullYear", "getMonth", "getDate", "getHours", "getMinutes", "getSeconds" ];

				for(f in fragments) {
					if(date[fragments[f]]() == arg[fragments[f]]()) {
						result = ++f;
					} else break;
				}

				return result;
			},
			// Number of days in current month
			get days() {
				return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
			},
			// First day of the week in current month
			get firstDay() {
				return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
			},
			// ISO-8601 week number of current date
			get week() {
				var d = new Date(date);
				d.setHours(0, 0, 0);
				d.setDate(d.getDate() + 4 - (d.getDay() || 7));
				return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 86400000) + 1) / 7);
			}
		};
	}

	// Function used to parse a formatted string based on specified locale
	function formatted(date, format, locale) {
		var d = date.getDate(),
		    m = date.getMonth(),
		    y = date.getFullYear(),
		    h = date.getHours(),
		    h12 = (h % 12) || (locale.zeroHour ? 0 : 12),
		    n = date.getMinutes(),
		    s = date.getSeconds(),
		    w = δ(date).week,
		    wd = date.getDay(),
		    ap = h < 12 ? locale.anteMeridiem : locale.postMeridiem;

		return format
		.replace(/{date}/gi, locale.formatDate)
		.replace(/{datetime}/gi, locale.formatDateTime)
		.replace(/{isodate}/gi, "{YYYY}-{MM}-{DD}")
		.replace(/{yearmonth}/gi, locale.formatYearMonth)
		.replace(/{ww}/gi, ("0" + w).slice(-2))
		.replace(/{w}/gi, w)
		.replace(/{DDDD}/g, locale.dayOfWeek[wd])
		.replace(/{DDD}/g, locale.dayOfWeekShort[wd])
		.replace(/{DD}/g, ("0" + d).slice(-2))
		.replace(/{D}/g, d)
		.replace(/{MMMM}/g, locale.monthName[m])
		.replace(/{MMM}/g, locale.monthNameShort[m])
		.replace(/{MM}/g, ("0" + (m + 1)).slice(-2))
		.replace(/{M}/g, m + 1)
		.replace(/{YYYY}/g, y)
		.replace(/{YY}/g, y.toString().slice(-2))
		.replace(/{HH}/g, ("0" + h).slice(-2))
		.replace(/{H}/g, h)
		.replace(/{hh}/g, ("0" + h12).slice(-2))
		.replace(/{h}/g, h12)
		.replace(/{mm}/g, ("0" + n).slice(-2))
		.replace(/{m}/g, n)
		.replace(/{ss}/g, ("0" + s).slice(-2))
		.replace(/{s}/g, s)
		.replace(/{ap}/g, ap);
	}

	// Function used to create a table of days based on specified year and month
	function dayTable(year, month) {
		var firstDay = δ(new Date(year, month)).firstDay || 7,
		    current = new Date(year, month, 1 - ((firstDay - 1) || 7)),
		    row, col, table = [];

		for(row = 0; row < 6; ++row) {
			table.push([]);

			for(col = 0; col < 7; ++col) {
				table[row].push(new Date(current));
				current.setDate(current.getDate() + 1);
			}
		}

		return table;
	}

	// Function used to create a table of months based on specified year
	function monthTable(year) {
		var row, col, table = [];

		for(row = 0; row < 3; ++row) {
			table.push([]);

			for(col = 0; col < 4; ++col) {
				table[row].push(new Date(year, (row * 4) + col));
			}
		}

		return table;
	}

	// Chronopic main class
	function _(selector, options) {
		// Merge options with defaults
		options = Object.assign({
			className:      "chronopic",
			container:      null,
			date:           null,
			direction:      "down",
			format:         "{date}",
			locale:         null,
			max:            { year: 2100 },
			min:            { year: 1900 },
			monthYearOnly:  false,
			onChange:       null
		}, options);

		// Public properties
		this.container      = options.container;
		this.direction      = options.direction;
		this.format         = options.format;
		this.instances      = [];
		this.max            = ("object" == typeof options.max ? options.max : {});
		this.min            = ("object" == typeof options.min ? options.min : {});
		this.monthYearOnly  = (options.monthYearOnly === true);

		// Private properties
		this._i18n = _.i18n.en_GB;

		var self = this, date = new Date();

		// Set initial date if specified in options
		if(options.date && "object" == typeof (date = options.date)) {
			date = (date instanceof Date ? new Date(date) :
				new Date(date.year, date.month - 1, date.day));
		}

		// Parse minimum and maximum dates from options
		(self.max instanceof Date && (self.max = { year: self.max.getFullYear(), month: self.max.getMonth() + 1, day: self.max.getDate() }));
		(self.min instanceof Date && (self.min = { year: self.min.getFullYear(), month: self.min.getMonth() + 1, day: self.min.getDate() }));

		// Function used to check if a specified date is within a valid range
		function valid(year, month, day) {
			var days, min = self.min, max = self.max, fixed;

			// Fix day overflows
			while(day > (days = δ(new Date(year, month, day)).days)) {
				++month;
				day -= day - days;
			}

			// Fix month overflows
			while(month > 12) {
				++year;
				month -= 12;
			}

			if(!isNaN((fixed = new Date(year, month - 1, isNaN(day) ? 1 : day)))) {
				year = fixed.getFullYear();
				month = fixed.getMonth() + 1;
				day = fixed.getDate();
			}

			if(isNum(year)) {
				if((isNum(min.year) && year < min.year)
				|| (isNum(max.year) && year > max.year)) {
					return false;
				}

				if(isNum(month)) {
					if((isNum(min.month) && month < min.month && year <= min.year)
					|| (isNum(max.month) && month > max.month && year >= max.year)) {
						return false;
					}

					if(isNum(day)) {
						if((isNum(min.day) && day < min.day && month <= min.month && year <= min.year)
						|| (isNum(max.day) && day > max.day && month >= max.month && year >= max.year)) {
							return false;
						}
					}
				}
			}

			return true;
		}

		// Inject Chronpic in DOM Elements from constructor selector parameter
		("string" == typeof selector ? [].slice.call(document.querySelectorAll(selector)) : [ selector ])
		.forEach(function(element) {
			if(element instanceof HTMLElement) {
				_.instances.forEach(function(parent) {
					parent.instances.forEach(function(child, index, array) {
						if(child.element.element == element) {
							// Clear events and remove instance if previously defined by different selector
							child.element.on([ "click", "change", "keydown" ], null);
							array.splice(index, 1);
						}
					});
				});

				var sibling = element.nextSibling;
				((sibling.tagName == "DIV" && sibling.classList.contains(options.className)) || (sibling = null));

				var className = options.className,
					container = new Element("div." + className, { insertAfter: element, replace: sibling }),
				    instance,
				    self = this,
				    tables = {};

				[ "day", "month" ].forEach(function(table) {
					container.add((tables[table] = new Element("table.hidden." + table)));
					tables[table].head = new Element("thead", { appendTo: tables[table] });
					tables[table].body = new Element("tbody", { appendTo: tables[table] });
				});

				self.instances.push((instance = {
					date: new Date(date),
					container: container,
					element: new Element(element),
					selected: {},
					tables: tables,
					value: "",
					visible: false,

					get day() {
						return this.date.getDate();
					},
					set day(value) {
						if(valid(this.date.getFullYear(), this.date.getMonth() + 1, value)) {
							this.date.setDate(value);
							this.selected.day = new Date(this.date);
						}
					},
					hide: function() {
						for(var t in tables) {
							tables[t].classes.add("hidden");
						}

						this.visible = false;
						this.selected.month = null;

						if(this.selected.day) {
							this.date = new Date(this.selected.day);
							this.selected.month = new Date(this.date);
						}

						return this;
					},
					get hour() {
						return this.date.getHours();
					},
					set hour(value) {
						// TODO: check if valid (not disabled)
						this.date.setHours(value);
					},
					get minute() {
						return this.date.getMinutes();
					},
					set minute(value) {
						// TODO: check if valid (not disabled)
						this.date.setMinutes(value);
					},
					get month() {
						return this.date.getMonth();
					},
					set month(value) {
						if(valid(this.date.getFullYear(), value + 1)) {
							this.date.setMonth(value);
							this.selected.month = new Date(this.date);
						}
					},
					rebuild: function(table) {
						var instance = this,
						    sel = instance.selected,
						    now = new Date(),
						    dow = 1,
						    lables, i;

						if(!table || table == "day") {
							instance.tables.day.head.add([
								new Element("tr.title").add([
									new Element("th.prev[title=" + self.locale.prevMonth + "]", { html: "&lt;" })
									.on("click", function(e) {
										instance.date.setDate(1);
										instance.month--;
										instance.show("day");
										e.stopPropagation();
									}),
									new Element("th[colspan=6][title=" + self.locale.selectMonth + "]", { html: formatted(instance.date, self.locale.titleMonth, self.locale) })
									.on("click", function() {
										instance.show("month");
									}),
									new Element("th.next[title=" + self.locale.nextMonth + "]", { html: "&gt;" })
									.on("click", function(e) {
										instance.date.setDate(1);
										instance.month++;
										instance.show("day")
										e.stopPropagation();
									})
								]),
								(lables = new Element("tr.labels").add(new Element("th.week", { html: self.locale.week })))
							], true);

							for(i = 0; i < 7; ++i) {
								lables.add(new Element("th.day[title=" + self.locale.dayOfWeek[dow % 7] + "]", { html: self.locale.dayOfWeekShort[dow++ % 7] }));
							}

							instance.tables.day.body.clear();
							dayTable(instance.year, instance.month).forEach(function(row) {
								var tr = new Element("tr", { appendTo: instance.tables.day.body });
								tr.add(new Element("td.week", { html: δ(row[0]).week }));

								row.forEach(function(col) {
									var classNames = ".day",
										monthDiff = col.getMonth() - instance.month,
										disabled = !valid(col.getFullYear(), col.getMonth() + 1, col.getDate()),
										title = formatted(col, self.locale.titleDay, self.locale),
										elem;

									((monthDiff == -1 || monthDiff == 11) && (classNames += ".prev"));
									((monthDiff == 1 || monthDiff == -11) && (classNames += ".next"));
									(sel.day && δ(sel.day).compare(col) >= 3 && (classNames += ".selected"));
									(δ(col).compare(now) >= 3 && (classNames += ".now"));

									if(disabled) {
										classNames += ".disabled";
										title += " (" + self.locale.disabled + ")";
									}

									tr.add((elem = new Element("td[title=" + title + "]" + classNames, { html: col.getDate() })));
									(!disabled && elem.on("click", function() {
										instance.month = col.getMonth(),
										instance.day = col.getDate();
										instance.update().hide();
									}));
								});
							});
						}

						if(!table || table == "month") {
							instance.tables.month.head.add([
								new Element("tr.title").add([
									new Element("th.prev[title=" + self.locale.prevYear + "]", { html: "&lt;" })
									.on("click", function(e) {
										instance.year--;
										instance.show("month");
										e.stopPropagation();
									}),
									new Element("th.year[colspan=6][title=" + self.locale.year + "]").add(
										new Element("input[type=number][step=1][min=" + (self.min.year || 0) + "][max=" + (self.max.year || 9999) + "][value=" + instance.year + "]")
										.on("change", function(e, v) {
											if(isNum((v = Number(e.target.value)))) {
												instance.year = v;
												instance.show("month");
												instance.container.element.querySelector(".year input").focus();
											}
										})
									),
									new Element("th.next[title=" + self.locale.nextYear + "]", { html: "&gt;" })
									.on("click", function(e) {
										instance.year++;
										instance.show("month");
										e.stopPropagation();
									})
								]),
							], true);

							instance.tables.month.body.clear();
							monthTable(instance.year).forEach(function(row) {
								var tr = new Element("tr", { appendTo: instance.tables.month.body });

								row.forEach(function(col) {
									var classNames = ".month",
									    month = col.getMonth(),
									    disabled = !valid(col.getFullYear(), month + 1),
									    title = formatted(col, self.locale.titleMonth, self.locale),
									    elem;

									(sel.month && δ(sel.month).compare(col) >= 2 && (classNames += ".selected"));
									(disabled && (classNames += ".disabled"));
									(δ(col).compare(now) >= 2 && (classNames += ".now"));

									if(disabled) {
										classNames += ".disabled";
										title += " (" + self.locale.disabled + ")";
									}

									tr.add((elem = new Element("td[colspan=2][title=" + title + "]" + classNames, { html: self.locale.monthNameShort[month] })));
									(!disabled && elem.on("click", function() {
										instance.date.setDate(1);
										instance.month = month;
										(self.monthYearOnly === true ? instance.update().hide() : instance.show("day"));
									}));
								});
							});
						}

						return this;
					},
					get second() {
						return this.date.getSeconds();
					},
					set second(value) {
						// TODO: check if valid (not disabled)
						this.date.setSeconds(value);
					},
					show: function(table) {
						table = (self.monthYearOnly === true ? "month" : (table || "day"));
						this.rebuild(table);
						this.visible = true;

						var widget = { elem: this.container.element },
						    parent = { elem: (self.container instanceof HTMLElement ? self.container : widget.elem.parentNode) },
						    target = { elem: element },
						    dir = self.direction, t, upPos, downPos, centerPos, fitsDown, fitsUp;

						// Calculate dimensions and positions
						[ widget, parent, target ].forEach(function(item, idx) {
							var rect = item.elem.getBoundingClientRect();

							item.h = item.elem.offsetHeight;
							item.w = item.elem.offsetWidth;
							item.abs = { x: rect.left, y: rect.top };
							item.rel = { x: item.elem.offsetLeft, y: item.elem.offsetTop };
						});

						// Show correct table and update widget dimensions
						for(t in tables) {
							(tables.hasOwnProperty(t) && tables[t].classes[(t == table ? "remove" : "add")]("hidden"));
							widget.h = Math.max(widget.h, tables[t].element.offsetHeight);
							widget.w = Math.max(widget.w, tables[t].element.offsetWidth);
						}

						upPos = (target.rel.y - widget.h) + "px";
						downPos = (target.rel.y + target.h) + "px";
						centerPos = ((parent.h / 2) - (widget.h / 2)) + "px";
						fitsDown = (target.abs.y + target.h + widget.h < parent.abs.y + parent.h);
						fitsUp = (target.abs.y - widget.h > parent.abs.y);

						widget.elem.style.top =
							(dir == "down" ? downPos :
								(dir == "up" ? upPos :
									(fitsDown ? downPos :
										(fitsUp ? upPos :
											centerPos))));

						(widget.w == target.w || (widget.elem.style.width = target.w + "px"));
					},
					update: function() {
						this.value = element.value = formatted(this.date, self.format, self._i18n);
						this.selected.day = new Date(this.date);

						if(typeof options.onChange == 'function') {
							options.onChange(element, this.date);
						}

						return this;
					},
					get year() {
						return this.date.getFullYear();
					},
					set year(value) {
						(valid(value) && this.date.setFullYear(value));
					}
				}));

				((options.date && instance.update()) || (element.value = ""));

				// Handle DOM events
				instance.element
				.on("click", function(e) {
					instance[(instance.visible ? "hide" : "show")]();
				})
				.on("keydown", function(e) {
					var key = e.keyCode,
					    beg = e.target.selectionStart, end,
					    inc, tmp, leftmost, rightmost, genSegs;

					// 37:left, 38:up, 39:right, 40:down
					if(key < 37 || key > 40) {
						return;
					}

					// Split format string into segments of placeholders and separators
					(genSegs = function(value) {
						var segs = [], fmt, pos = 0;

						self.format.match(/(\{[^}]*\}|[^{]+)/g).forEach(function(seg, idx, arr) {
							// Translate formatted string if needed
							fmt = /^\{(.*)\}$/.test(seg) ? formatted(instance.date, seg, self._i18n) : seg;

							// Update end position of previous segment if present
							((idx = segs.length) && (segs[idx - 1].end = pos));

							segs.push({
								fmt:    seg,            // Format string
								val:    fmt,            // Output value
								beg:    pos,            // Start position
								end:    value.length,   // End position
								field:  (seg != fmt)    // Editable field?
							});

							// Determine leftmost and rightmost editable fields
							((seg != fmt) && (rightmost = segs[idx]) && (leftmost || (leftmost = rightmost)));

							pos += fmt.length;
						});

						return segs;
					})(e.target.value)

					// Loop through generated segments to determine keyboard action
					.forEach(function(seg, idx, arr) {
						if(beg < leftmost.beg) {
							beg = leftmost.beg;
							end = leftmost.end;
						} else if(beg > rightmost.beg) {
							beg = rightmost.beg;
							end = rightmost.end;
						} else if(!end && beg >= seg.beg && beg < seg.end) {
							// Highlight editable segment if applicable
							if(seg.field && e.target.selectionEnd == beg) {
								beg = seg.beg;
								end = seg.end;
							}

							// Change highlight to editable segment left of current
							else if(key == 37) {
								while(idx && !tmp) {
									if((tmp = arr[--idx]).field) {
										beg = tmp.beg;
										end = tmp.end;
									} else tmp = null;
								}
								(end || (end = leftmost.end));
							}

							// Change highlight to editable segment right of current
							else if(key == 39) { // right
								while(++idx < arr.length && !tmp) {
									if((tmp = arr[idx]).field) {
										beg = tmp.beg;
										end = tmp.end;
									} else tmp = null;
								}
								(end || (end = rightmost.end));
							}

							// Change value of highlighted segment
							else if(key == 38 || key == 40) {
								// Ensure highlighted segment is editable
								if(seg.field) {
									var fmt = seg.fmt, inc = (key == 38 ? 1 : -1);

									if(/D{1,2}/.test(fmt)) {
										instance.day += inc;
									} else if(/M{1,4}/.test(fmt)) {
										instance.month += inc;
									} else if(/YY(YY)?/.test(fmt)) {
										instance.year += inc;
									} else if(/HH?/i.test(fmt)) {
										instance.hour += inc;
									} else if(/mm?/.test(fmt)) {
										instance.minute += inc;
									} else if(/ss?/.test(fmt)) {
										instance.second += inc;
									} else if(/ap/.test(fmt)) {
										instance.hour += (12 * inc);
									}

									// Update GUI
									instance.update();
									(instance.visible && instance.show());

									// Update highlight area
									tmp = genSegs(e.target.value)[idx];
									beg = tmp.beg;
									end = tmp.end;
								}

								// ...Otherwise, highlight editable segment to the left
								else while(idx && !tmp) {
									if((tmp = arr[--idx]).field) {
										beg = tmp.beg;
										end = tmp.end;
									} else tmp = null;
								}
							}
						}
					});

					e.preventDefault();
					e.target.selectionStart = beg;
					e.target.selectionEnd = end || beg;
				})
				.on("change", function(e) {
					var newVal = e.target.value,
					    valPos = 0,
					    status = true,
					    d, m, y, h, n, s, a;

					self.format.match(/(\{[^}]*\}|[^{]+)/g).forEach(function(seg, idx, arr) {
						if(status) {
							if(/^\{(.*)\}$/.test(seg)) {
								var val = newVal.slice(valPos);
								(++idx < arr.length && (val = val.slice(0, val.search(arr[idx]))));
								valPos += val.length;
								seg = seg.slice(1, -1);

								if(seg == "DD" || seg == "D") {
									d = Number(val);
								} else if(seg == "MMMM") {
									self._i18n.monthName.forEach(function(monthName, monthNumber) {
										(!m && val == monthName && (m = monthNumber + 1));
									});
									(m || (status = false));
								} else if(seg == "MMM") {
									self._i18n.monthNameShort.forEach(function(monthName, monthNumber) {
										(!m && val == monthName && (m = monthNumber + 1));
									});
									(m || (status = false));
								} else if(seg == "MM" || seg == "M") {
									m = Number(val);
								} else if(seg == "YYYY" || seg == "YY") {
									y = Number(val);
								} else if(seg == "HH" || seg == "H" || seg == "hh" || seg == "h") {
									h = Number(val);
								} else if(seg == "mm" || seg == "m") {
									n = Number(val);
								} else if(seg == "s" || seg == "s") {
									s = Number(val);
								} else if(seg == "ap") {
									((a = val) != self._i18n.anteMeridiem && a != self._i18n.postMeridiem && (status = false));
								} else {
									status = false;
								}
							} else if(newVal.substr(valPos, seg.length) == seg) {
								valPos += seg.length;
							} else {
								status = false;
							}
						}
					});

					if(!status) {
						e.target.value = instance.value;
						return;
					}

					(isNum(s) && (instance.second = s));
					(isNum(n) && (instance.minute = n));
					(isNum(h) && (instance.hour = h));
					(isNum(d) && (instance.day = d));
					(isNum(m) && (instance.month = m - 1));
					(isNum(y) && (instance.year = y));

					instance.update();
					(instance.visible && instance.show());
				});

				document.addEventListener("click", function(e, node) {
					while((node = node ? node.parentNode : e.target)) {
						if(node == element || node == container.element) {
							return;
						}
					}
					instance.hide();
				});
			}
		}, this);

		// Use locale specified in constructor options if specified, otherwise browser locale. Default locale as fallback
		this.locale = (options.locale || (navigator ? (navigator.userLanguage || navigator.language).replace("-", "_") : null));

		_.instances.push(this);
	}

	_.VERSION = 0.43;
	_.instances = [];

	_.prototype = {
		get direction() {
			return (this._dir || "auto");
		},
		set direction(value) {
			([ "auto", "down", "up" ].indexOf(value.toLowerCase()) != -1 && (this._dir = value.toLowerCase()));
			return this.direction;
		},
		get format() {
			switch(this._fmt) {
			case "{date}":
				return this._i18n.formatDate;

			case "{datetime}":
				return this._i18n.formatDateTime;

			case "{yearmonth}":
				return this._i18n.formatYearMonth;
			}

			return (this._fmt || "");
		},
		set format(value) {
			this._fmt = ("string" == typeof value ? value : "");
		},
		get locale() {
			return this._i18n;
		},
		set locale(value) {
			if(_.i18n[value] && (_.i18n[value] !== this._i18n)) {
				this._i18n = _.i18n[value];

				this.instances.forEach(function(instance) {
					if(instance.selected.day) {
						instance.day = instance.date.getDate();
						instance.update()
					}

					instance.rebuild();
				});
			}
		}
	};

	// Default locale settings
	_.i18n = {
		en_GB: {
			anteMeridiem:       "㏂",
			dayOfWeek:          [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
			dayOfWeekShort:     [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			disabled:           "disabled",
			formatDate:         "{D} {MMMM} {YYYY}",
			formatDateTime:     "{D} {MMMM} {YYYY}, {h}:{mm} {ap}",
			formatYearMonth:    "{MMMM} {YYYY}",
			month:              "Month",
			monthName:          [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			monthNameShort:     [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			nextMonth:          "Next month",
			nextYear:           "Next year",
			postMeridiem:       "㏘",
			prevMonth:          "Previous month",
			prevYear:           "Previous year",
			selectMonth:        "Select month",
			titleDay:           "{DDDD} {D} {MMMM} {YYYY}",
			titleMonth:         "{MMMM} {YYYY}",
			week:               "Week",
			year:               "Year"
		}
	};

	if(typeof window != "undefined") {
		// Enable dynamic resizing of Chronopic instances
		window.addEventListener("resize", function(e) {
			_.instances.forEach(function(instance) {
				instance.instances.forEach(function(instance) {
					(instance.visible && (instance.show()));
				});
			});
		});

		window.Chronopic = _;
	}

	if(typeof module == "object" && module.exports) {
		module.exports = _;
	}

	return _;
})();
