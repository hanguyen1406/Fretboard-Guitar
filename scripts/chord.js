const ACTIVE_CHORD_FEATURE = () => {
    // Rerender Base body
    $('body .content').html(COMMON_CONTENT_HTML_BASE);
    // Render dots
    for (var i = 0; i <= 12; i++) {
        $('.red-dot.low-e ul').append(`<li dot-number="${i}">.</li>`)
        $('.red-dot.a ul').append(`<li dot-number="${i}">.</li>`)
        $('.red-dot.d ul').append(`<li dot-number="${i}">.</li>`)
        $('.red-dot.g ul').append(`<li dot-number="${i}">.</li>`)
        $('.red-dot.b ul').append(`<li dot-number="${i}">.</li>`)
        $('.red-dot.high-e ul').append(`<li dot-number="${i}">.</li>`)
    }
    // Render Notes
    for (let i = 0; i < COMMON_NOTES.e.length; i++) {
        $('.mask.low-e ul').append(`<li note-number="${i}">${COMMON_NOTES.e[i]}</li>`)
        $('.mask.a ul').append(`<li note-number="${i}">${COMMON_NOTES.a[i]}</li>`)
        $('.mask.d ul').append(`<li note-number="${i}">${COMMON_NOTES.d[i]}</li>`)
        $('.mask.g ul').append(`<li note-number="${i}">${COMMON_NOTES.g[i]}</li>`)
        $('.mask.b ul').append(`<li note-number="${i}">${COMMON_NOTES.b[i]}</li>`)
        $('.mask.high-e ul').append(`<li note-number="${i}">${COMMON_NOTES.e[i]}</li>`)
    }
    $('.guitar-neck li[note-number]').css({ opacity: 0 });

    // Set open note
    const noteOpens = [
        { className: 'low-e', note: 'E' },
        { className: 'b', note: 'B' },
        { className: 'g', note: 'G' },
        { className: 'd', note: 'D' },
        { className: 'a', note: 'A' },
        { className: 'high-e', note: 'E' },
    ]
    noteOpens.forEach(item => $('.open-notes .' + item.className).text(item.note))

    // Render controls
    $('.controls').append(`
        <div class="control-chord">
            <div class="control-header">
                <h2>Choose Chord to show:</h2>
                <div class="checkbox-show-note">
                    <input type="checkbox">
                    <h3>Show notes</h3>
                </div>
            </div>
			<ul class="chord-major"></ul>
			<ul class="chord-minor"></ul>
		</div>
    `);
    // Render Red Dots
    COMMON_CHORDS.majors.forEach(chord => {
        $('ul.chord-major').append(`<li button-click id="btn-chord-${chord.name}">${chord.name}</li>`)
    });
    COMMON_CHORDS.minors.forEach(chord => {
        $('ul.chord-minor').append(`<li button-click id="btn-chord-${chord.name}">${chord.name}</li>`)
    });
    // Render compartment number
    for (let i = 1; i <= 12; i++) {
        $('ul.compartment-number').append(`<li>${i}</li>`)
    }

    // Process event
    let canClick = true;
    let chordActive = null;

    $('.controls .control-chord li').click(function () {
        chordSymbol = $(this).text();
        showChordNumber(chordSymbol);
    });

    const showChordNumber = (chordSymbol) => {
        if (!canClick) return;
        chordActive = COMMON_CHORDS.majors.find(item => item.name === chordSymbol) || COMMON_CHORDS.minors.find(item => item.name === chordSymbol);
        if (!chordActive) {
            canClick = true;
            return;
        }
        // Check is show note mode
        const isShowNote = $('.checkbox-show-note input[type="checkbox"]').is(':checked');
        if (isShowNote) {
            showNoteMode();
            return;
        }
        canClick = false;
        $('.guitar-neck li[note-number]').animate({ opacity: 0 }, 500);
        $('li[dot-number]').animate({ opacity: 0 }, 500).promise();
        // Set and render red dot
        const guitarStrings = [
            '.red-dot.high-e',
            '.red-dot.b',
            '.red-dot.g',
            '.red-dot.d',
            '.red-dot.a',
            '.red-dot.low-e',
        ];
        chordActive.strings.forEach((item, index) => {
            const fret = item ? item.fret : 0;
            const finger = item ? item.finger : 0;
            $(`${guitarStrings[index]} li[dot-number="${fret}"]`).text(finger).animate({ opacity: 1 }, 500);
        })

        setTimeout(() => {
            canClick = true;
        }, 500);
    }

    const showNoteMode = () => {
        if (!canClick) return;
        const isShowNote = $('.checkbox-show-note input[type="checkbox"]').is(':checked');
        if (isShowNote) {
            canClick = false;
            $('li[dot-number]').animate({ opacity: 0 }, 500);
            if (chordActive) {
                $('[note-number]').animate({ opacity: 0 }, 500);
                const notesClassName = ['.mask.high-e', '.mask.b', '.mask.g', '.mask.d', '.mask.a', '.mask.low-e']
                chordActive.strings.forEach((chord, index) => {
                    if (chord) {
                        $(`.notes ${notesClassName[index]} ul li[note-number="${chord.fret}"]`).animate({ opacity: 1 }, 500);
                    }
                })
            } else {
                $('.guitar-neck li[note-number]').animate({ opacity: 1 }, 500);
            }
            setTimeout(() => {
                canClick = true;
            }, 500);
        } else {
            $('.guitar-neck li[note-number]').animate({ opacity: 0 }, 500);
            if (chordActive) showChordNumber(chordActive.name);
        }
    }

    // Set event for checkbox
    $('.checkbox-show-note input[type="checkbox"]').click(function () {
        showNoteMode();
    });

    COMMON_SET_BUTTON_CLICK();
}