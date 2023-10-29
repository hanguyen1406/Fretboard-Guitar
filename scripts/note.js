const ACTIVE_NOTE_FEATURE = () => {
    // Rerender Base body
    $('body .content').html(COMMON_CONTENT_HTML_BASE);
    // Render Notes
    for (let i = 0; i < COMMON_NOTES.e.length; i++) {
        $('.mask.low-e ul').append('<li note=' + COMMON_NOTES.e[i] + '>' + COMMON_NOTES.e[i] + '</li>')
        $('.mask.a ul').append('<li note=' + COMMON_NOTES.a[i] + '>' + COMMON_NOTES.a[i] + '</li>')
        $('.mask.d ul').append('<li note=' + COMMON_NOTES.d[i] + '>' + COMMON_NOTES.d[i] + '</li>')
        $('.mask.g ul').append('<li note=' + COMMON_NOTES.g[i] + '>' + COMMON_NOTES.g[i] + '</li>')
        $('.mask.b ul').append('<li note=' + COMMON_NOTES.b[i] + '>' + COMMON_NOTES.b[i] + '</li>')
        $('.mask.high-e ul').append('<li note=' + COMMON_NOTES.e[i] + '>' + COMMON_NOTES.e[i] + '</li>')
    }
    // Render controls
    const noteControls = ['All', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    $('.controls').append(`
        <a class="up" href="#">Tune 1/2 Step Up</a>
		<a class="down" href="#">Tune 1/2 Step Down</a>

		<div class="control-note">
			<h2>Choose note to show:</h2>
			<ul>
                ${noteControls.map(note => `<li button-click id="btn-note-${note.replace('#','_')}">${note}</li>`).join('')}
			</ul>
		</div>
    `);
    // Process event
    const slideSpeed = 300;
    let noteToShow = "All";
    let canClick = true;
    $('.controls a.down').click(function () {
        if (!canClick) { return false; }
        canClick = false;
    
        $('.mask').each(function () {
            var el = $(this);
            var nextNote = el.find('li:nth-child(12)').text();
    
            el.animate({ right: -268 }, slideSpeed);
            setTimeout(function () {
                el.find('ul').prepend("<li note=" + nextNote + ">" + nextNote + "</li>");
                el.find('li:last-child').remove();
                el.css({ right: -189 });
            }, slideSpeed + 20)
        });
    
        setTimeout(function () {
            changeOpenNotes();
            showNotes(noteToShow);
            canClick = true;
        }, slideSpeed + 20)
    
        return false;
    });
    
    $('.controls a.up').click(function () {
        if (!canClick) { return false; }
        canClick = false;
    
        $('.mask').each(function () {
            var el = $(this);
            var nextNote = el.find('li:nth-child(2)').text();
    
            $("<li note=" + nextNote + ">" + nextNote + "</li>").appendTo(el.find('ul'));
            el.css({ top: 150 });
            el.find('li:first-child').remove();
            el.animate({ top: -6 }, slideSpeed);
    
        });
    
        changeOpenNotes();
        showNotes(noteToShow);
    
        setTimeout(function () {
            canClick = true;
        }, slideSpeed + 20)
        return false;
    });

    $('.controls .control-note li').click(function () {
        noteToShow = $(this).text();
        showNotes(noteToShow);
    });

    const showNotes = (noteToShow) =>  {
        if (noteToShow == "All") {
            $('.guitar-neck .notes li').animate({ opacity: 1 }, 500);
        } else {
            $('.guitar-neck .notes li').not('[note="' + noteToShow + '"]').animate({ opacity: 0 }, 500);
            $('.guitar-neck .notes li[note="' + noteToShow + '"]').animate({ opacity: 1 }, 500);
        }
    }

    const changeOpenNotes = () => {
        $('.notes .mask').each(function () {
            var el = $(this);
            var elClass = el.attr('class').split(' ')[1];
            var note = el.find('li:first-child').text();
    
            $('.open-notes .' + elClass).text(note);
        });
    }

    COMMON_SET_BUTTON_CLICK();
}