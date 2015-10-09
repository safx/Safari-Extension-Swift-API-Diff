(function() {

    var diffReport = document.querySelector('div.diffReport2');
    if (diffReport == null)
        return;

    var tables = diffReport.querySelectorAll('table');
    for (var i = 0; i < tables.length; ++i) {
        var tbl = tables[i];
        var tds = tbl.querySelectorAll('td');

        var len = tds.length;
        if (len % 2 == 1)
            continue;

        var fromText = difflib.stringAsLines(tds[0].textContent);
        var toText = difflib.stringAsLines(tds[len / 2].textContent);

        var sm = new difflib.SequenceMatcher(fromText, toText);
        var diff = diffview.buildView({
            baseTextLines: fromText,
            newTextLines: toText,
            opcodes: sm.get_opcodes(),
            baseTextName: "From",
            newTextName: "To"
        });
        tbl.parentNode.insertBefore(diff, tbl);
        tbl.remove();
    }

}());
