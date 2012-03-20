var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
(function($) {
    var MultiFields;
    MultiFields = (function() {
        function MultiFields(container, options) {
            var maxData, titleData;
            this.container = container;
            this.rows = this.container.children().addClass("multifields-row");
            this.rows.each(function() {
                return $(this).append("<div class=\"multifields-row-buttons\" />");
            });
            this.row = this.rows.eq(0).clone();
            this.row.find("[disabled]").removeAttr("disabled").val("");
            maxData = this.container.data("maxFields");
            titleData = this.container.data("title");
            this.options = {
                max: maxData ? maxData : 5,
                title: titleData ? titleData : 5,
                buttons: {
                    add: "<a href=\"#\">add</a>",
                    del: "<a href=\"#\">delete</a>"
                }
            };
            if (options) {
                event.extend(this.options, options);
            }
            this.buttons = {
                add: $(this.options.buttons.add).addClass("multifields-add-field"),
                del: $(this.options.buttons.del).addClass("multifields-del-field")
            };
            this.init();
        }
        MultiFields.prototype.init = function() {
            this.updateRows();
            this.updateButtons();
            this.container.on("click", "a.multifields-add-field", {
                MultiFields: this
            }, function(evt) {
                evt.preventDefault();
                return evt.data.MultiFields.add();
            });
            this.container.on("click", "a.multifields-del-field", {
                MultiFields: this
            }, function(evt) {
                var index, row;
                evt.preventDefault();
                row = $(this).closest(".multifields-row");
                index = evt.data.MultiFields.rows.index(row);
                return evt.data.MultiFields.remove(index);
            });
            return this;
        };
        MultiFields.prototype.add = function() {
            var num, row;
            if (this.rows.length < this.options.max) {
                row = this.row.clone();
                num = this.rows.length + 1;
                this.container.append(row).trigger("MultiFields.add", row);
                this.update();
                row.find("input:text").eq(0).focus();
            }
            return this;
        };
        MultiFields.prototype.remove = function(index) {
            if (index > 0) {
                this.rows.eq(index).remove();
                this.container.trigger("MultiFields.remove", index);
                this.update();
            }
            return this;
        };
        MultiFields.prototype.update = function() {
            this.updateRows();
            this.updateNames();
            this.updateButtons();
            this.container.trigger("MultiFields.update");
            return this;
        };
        MultiFields.prototype.updateButtons = function() {
            var count, max;
            max = this.options.max;
            count = this.rows.length;
            this.rows.find(".multifields-add-field, .multifields-del-field").remove().end().each(__bind(function(index, row) {
                var inputs;
                row = $(row);
                inputs = row.find(".multifields-row-buttons");
                if (inputs.length <= 0) {
                    inputs = row;
                }
                if (max !== count && count === (index + 1)) {
                    inputs.append(this.buttons.add.clone());
                }
                if (index > 0) {
                    return inputs.append(this.buttons.del.clone());
                }
            }, this));
            return this;
        };
        MultiFields.prototype.updateNames = function() {
            this.rows.each(function(number) {
                $(this).find("label[for]").each(function() {
                    return $(this).attr("for", function(i, attr) {
                        var id;
                        id = attr.replace(/\_[0-9]+\_{1,2}/, "_" + number + "_");
                        return id;
                    });
                });
                return $(this).find("[name]").each(function() {
                    return $(this).attr("name", function(i, attr) {
                        var name;
                        name = attr.replace(/\[[0-9]+\]{1,2}/, "[" + number + "]");
                        return name;
                    }).attr("id", function(i, attr) {
                            var id;
                            id = attr.replace(/\_[0-9]+\_{1,2}/, "_" + number + "_");
                            return id;
                        });
                });
            });
            return this;
        };
        MultiFields.prototype.updateRows = function() {
            this.rows = this.container.children();
            return this;
        };
        return MultiFields;
    })();
    $(document).ready(function() {
        return $(".multifields").each(function() {
            var elem, obj;
            elem = $(this);
            obj = new MultiFields(elem);
            return elem.data("form.MultiFields", obj);
        });
    });
    return $.MultiFields = MultiFields;
}).call(this, jQuery);