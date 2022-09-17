/* demo.js, based on jQuery. */

var FONT_FEATURE_SUPPORT = false;

$(window).on("load", function () {
    if (window.location.search.indexOf("pua") < 0) {
        $("body").append(
            '<div id="ot_feature_test" style="font-size:72px"><span>a</span></div>'
        );
        var control = $("#ot_feature_test span").width();
        $("#ot_feature_test span").attr(
            "style",
            'font-size:72px;-webkit-font-feature-settings: "ss01" 1; -moz-font-feature-settings: "ss01=1"; -moz-font-feature-settings: "ss01" 1; -o-font-feature-settings: "ss01" 1; font-feature-settings: "ss01" 1;'
        );
        var test = $("#ot_feature_test span").width();
        $("#ot_feature_test").remove();
        if (control != test) {
            FONT_FEATURE_SUPPORT = true;
        }
    }

    console.log("font-feature-settings support?", FONT_FEATURE_SUPPORT);
});

$(function () {
    var code = $("#preview-code");

    // FONT FAMILY
    $("#font_families input[type=radio]").on("click change", function (evt) {
        var i = $('#default_glyphs input[name="preview_i-form"]');
        var l = $('#default_glyphs input[name="preview_l-form"]');
        switch (this.value) {
            case "Input_Serif":
                //no i/l alts for serif
                var inow = i.filter(":checked");
                var lnow = l.filter(":checked");
                i.first().prop("checked", true).trigger("change");
                l.first().prop("checked", true).trigger("change");
                inow.prop("checked", true);
                lnow.prop("checked", true);
                i.prop("disabled", true);
                l.prop("disabled", true);
                break;

            /*
			case "Input_Mono":
				i.prop('disabled',false);
				l.prop('disabled',false);
				if (i.filter('.mono-disabled').prop('checked'))
					i.filter('.mono-default').prop('checked', true).trigger('change');
				if (l.filter('.mono-disabled').prop('checked'))
					l.filter('.mono-default').prop('checked', true).trigger('change');
				i.filter('.mono-disabled').prop('disabled',true);
				l.filter('.mono-disabled').prop('disabled',true);
				break;
			*/

            default:
                i.prop("disabled", false);
                l.prop("disabled", false);
                i.filter(":checked").trigger("change");
                l.filter(":checked").trigger("change");
                break;
        }
    });

    // LANGUAGES
    var texts = {};

    var codemirror;
    $("select#content")
        .on("change", function () {
            var select = $(this);
            var language = select.val();

            var url;
            switch (language) {
                case "javascript":
                    url = "/js/preview.js";
                    break;
                default:
                    url = "/samples/" + language + ".txt";
                    break;
            }
            console.log("Loading", language, url);

            var textarea = $("<textarea></textarea>");
            $.ajax(url, {
                dataType: "text", //don't let jQuery try to be smart and interpret the result
                success: function (responseText) {
                    if (CodeMirror.runMode) {
                        // QUICK MODE
                        code.html("<div class='CodeMirror'></div>");
                        CodeMirror.runMode(
                            responseText,
                            language,
                            code.children().get(0)
                        );
                    } else {
                        // FULL EDITABLE MODE
                        textarea = $("<textarea></textarea>");
                        code.html(textarea);
                        textarea.text(responseText);
                        var mode = { name: language };
                        if (language == "clike") {
                            mode.name = "text/x-c++src";
                            mode.useCPP = true;
                        }
                        codemirror = CodeMirror.fromTextArea(textarea.get(0), {
                            //lineNumbers: true,
                            //styleActiveLine: true,
                            mode: mode,
                        });
                    }

                    //apply theme
                    $("#colors").trigger("change");
                },
                error: function (xhr, status, error) {
                    textarea.addClass("error").text(error || status);
                    code.html(textarea);
                },
                complete: function () {
                    //code.html(textarea);
                },
            });
        })
        .trigger("change");

    // COLORS
    var themes = {};
    $("#colors")
        .on("change", function () {
            var ourtheme = $(this).val();
            //var theirtheme = color2theme[ourtheme];
            var codemirrors = code.children(".CodeMirror");
            if (codemirrors.length) {
                var classes = codemirrors.get(0).className.split(" ");
                for (var i = 0, n = classes.length; i < n; i++) {
                    if (classes[i].indexOf("cm-s-") == 0)
                        codemirrors.removeClass(classes[i]);
                }
                codemirrors.addClass("cm-s-" + ourtheme);
                //if (theirtheme)
                //	codemirrors.addClass('cm-s-' + theirtheme);
            }
        })
        .trigger("change");

    // FONT SETS
    var familysets = $("input[name=preview_families]");
    familysets
        .on("click", function () {
            familysets.each(function () {
                code[this.checked ? "addClass" : "removeClass"](this.value);
            });
        })
        .filter(":checked")
        .trigger("click");

    // ALTERNATE CHARS

    /*
		
		Stylistic Set 01: Schoolbook a
		Stylistic Set 02: Schoolbook g
		
		Stylistic Set 03: i with top serif
		Stylistic Set 04: l with top serif
		
		Stylistic Set 05: i with top and bottom serif
		Stylistic Set 06: l with top and bottom serif
		
		Stylistic Set 07: i with full serif (default in mono)
		Stylistic Set 08: l with full serif (default in mono)
		
		Stylistic Set 09: i with top serif and tail
		Stylistic Set 10: l with top serif and tail
		
		Stylistic Set 11: asterisk

		Stylistic Set 12: less curly braces
		
		Stylistic Set 13: empty zero
		
	*/

    var puaMap = {
        ss01: {
            57344: 97,
            57345: 224,
            57346: 225,
            57347: 226,
            57348: 227,
            57349: 228,
            57350: 229,
            57351: 257,
            57352: 259,
            57353: 261,
            57354: 1072,
        },
        ss02: { 57355: 103, 57356: 285, 57357: 287, 57358: 289, 57359: 291 },

        ss03: {
            57408: 307,
            57409: 1110,
            57410: 1111,
            57398: 105,
            57399: 305,
            57400: 236,
            57401: 237,
            57402: 238,
            57403: 239,
            57404: 297,
            57405: 299,
            57406: 301,
            57407: 303,
        },
        ss04: { 57416: 322, 57411: 108, 57412: 314, 57413: 316, 57415: 320 },

        ss05: {
            57379: 105,
            57380: 305,
            57381: 236,
            57382: 237,
            57383: 238,
            57384: 239,
            57385: 297,
            57386: 299,
            57387: 301,
            57388: 303,
            57389: 307,
            57390: 1110,
            57391: 1111,
        },
        ss06: { 57392: 108, 57393: 314, 57394: 316, 57396: 320, 57397: 322 },

        ss07: {
            57360: 105,
            57361: 305,
            57362: 236,
            57363: 237,
            57364: 238,
            57365: 239,
            57366: 297,
            57367: 299,
            57368: 301,
            57369: 303,
            57370: 307,
            57371: 1110,
            57372: 1111,
        },
        ss08: { 57377: 320, 57378: 322, 57373: 108, 57374: 314, 57375: 316 },

        ss09: {
            57417: 105,
            57418: 305,
            57419: 236,
            57420: 237,
            57421: 238,
            57422: 239,
            57423: 297,
            57424: 299,
            57425: 301,
            57426: 303,
            57427: 307,
            57428: 1110,
            57429: 1111,
        },
        ss10: { 57432: 316, 57434: 320, 57435: 322, 57430: 108, 57431: 314 },

        ss11: { 57437: 42 },
        ss12: { 0xe05e: 123, 0xe05f: 125 },
        ss13: { 0xe060: 48 },
        zero: { 57436: 48 },
    };

    var current_sets = [];

    var replacespan = function (from, to) {
        from = String.fromCharCode(from);
        to = String.fromCharCode(to);
        this.innerHTML = this.innerHTML.replace(
            RegExp(from == "*" ? "\\*" : from, "g"),
            to
        );
    };

    $("ul.alts input[type=radio]")
        .on("change", function (evt) {
            var newsets = [];
            $("ul.alts input[type=radio]:checked").each(function () {
                if (this.value && this.value != "on") newsets.push(this.value);
            });

            if (FONT_FEATURE_SUPPORT) {
                var w3c = '"' + newsets.join('", "') + '"';
                var old_moz = '"' + newsets.join("=1,") + '=1"';

                var css = code.get(0).style.cssText;
                css = css
                    .replace(/(-\w+)?font-feature-settings\s*:\s*[^;]+/g, "")
                    .replace(/;;+/g, ";")
                    .replace(/^;+/, "")
                    .replace(/;+$/, ";");

                if (newsets.length) {
                    css +=
                        "-moz-font-feature-settings:" +
                        old_moz +
                        ";-moz-font-feature-settings:" +
                        w3c +
                        ";-ms-font-feature-settings:" +
                        w3c +
                        ";-webkit-font-feature-settings:" +
                        w3c +
                        ";-o-font-feature-settings:" +
                        w3c +
                        ";font-feature-settings:" +
                        w3c;
                }

                //console.log(css);
                code.get(0).style.cssText = css;
            } else {
                var spans = $("#preview-code .CodeMirror-code span");
                var spanspan = spans.has("span");
                spans = spans.not(spanspan);
                $.each(puaMap, function (ss, swaps) {
                    //this is slow, so only do it if something has changed
                    var was_on = current_sets.indexOf(ss) >= 0;
                    var on = newsets.indexOf(ss) >= 0;

                    if ((was_on && !on) || (on && !was_on)) {
                        $.each(swaps, function (pua, reg) {
                            //update editor the official way; causes parse errors
                            //codemirror.setValue(codemirror.getValue().replace(RegExp(String.fromCharCode(on ? reg : pua), "g"), String.fromCharCode(on ? pua : reg)));

                            //hack the editor DOM without telling codemirror
                            spans.each(
                                $.proxy(
                                    replacespan,
                                    null,
                                    on ? reg : pua,
                                    on ? pua : reg
                                )
                            );
                        });
                    }
                });
            }

            current_sets = newsets;
        })
        .filter(":checked")
        .trigger("change");

    // WRAP
    $("input[name=wrap_lines]")
        .on("change", function () {
            code.children(".CodeMirror")[
                this.checked ? "addClass" : "removeClass"
            ]("CodeMirror-wrap");
        })
        .trigger("change");

    // SLIDERS
    $("input.range").each(function () {
        var orig = $(this);
        var newdiv = $("<div class='slider'><div></div></div>");
        newdiv.addClass(this.className);
        newdiv.attr("id", this.id);
        orig.replaceWith(newdiv);

        var changefunc;
        switch (this.name) {
            case "preview_size":
                changefunc = function (evt, slider) {
                    code.css("font-size", slider.value);
                };
                break;

            case "preview_width":
                var widths = {
                    1: "Compressed",
                    2: "Condensed",
                    3: "Narrow",
                    4: "Normal",
                };

                changefunc = function (evt, slider) {
                    code.removeClass(
                        "Compressed Condensed Narrow Normal"
                    ).addClass(widths[slider.value]);
                };
                break;

            case "preview_weight":
                changefunc = function (evt, slider) {
                    code.css("font-weight", slider.value);
                };
                break;

            case "preview_line-height":
                changefunc = function (evt, slider) {
                    code.css("line-height", slider.value);
                };
                break;
        }

        newdiv.addTouch();

        var options = {
            min: parseFloat(orig.attr("min")),
            max: parseFloat(orig.attr("max")),
            step: parseFloat(orig.attr("step")),
            value: parseFloat(orig.attr("value")),
            slide: changefunc,
            change: changefunc,
        };

        var sliderdiv = newdiv.children();
        sliderdiv.slider(options);
        sliderdiv.slider("value", sliderdiv.slider("value"));
    });

    //PRESETS
    var presets = [
        ["Input defaults", [0, 0, 0, 0, 0, 0]],
        ["Andale Mono style", [0, 0, 1, 2, 0, 0]],
        ["Anonymous Pro style", [0, 1, 3, 3, 1, 1]],
        ["Consolas style", [0, 0, 3, 3, 1, 0]],
        ["Deja Vu / Menlo style", [0, 1, 3, 4, 1, 1]],
        ["Envy Code R style", [0, 1, 1, 1, 1, 0]],
        ["Liberation Mono style", [0, 1, 3, 3, 0, 0]],
        ["Monaco style", [1, 1, 2, 2, 1, 0]],
        ["Pragmata Pro style", [0, 0, 3, 3, 0, 1]],
        ["Source Code Pro style", [0, 0, 1, 4, 0, 1]],
    ];

    $("#default_glyphs").after(
        "<div id='presets'><h4>Load preset configurations</h4><ul></ul></div>"
    );
    var ul = $("#presets ul");
    var lists = $("#default_glyphs > ul > li");
    $.each(presets, function (i, pair) {
        var label = pair[0];
        var checks = pair[1];

        var li = $("<li></li>");
        var a = $(
            "<a href='#" + encodeURIComponent(label) + "'>" + label + "</a>"
        );
        a.on("click", function (evt) {
            evt.preventDefault();
            $.each(checks, function (down, across) {
                console.log(down, across);
                lists
                    .eq(down)
                    .find("input[type=radio]")
                    .eq(across)
                    .prop("checked", true)
                    .trigger("change");
            });
        });
        li.append(a);
        ul.append(li);
    });
});
