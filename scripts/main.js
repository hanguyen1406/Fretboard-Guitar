// Render Base content
$('body .content').html(COMMON_CONTENT_HTML_BASE);
// Render Tags Control
const tagTypes = Object.values(COMMON_TYPES_CONTROL);
const $tagControlEl = $('.tabs-control');
(tagTypes || []).forEach(type => {
    $tagControlEl.append(`<li tab-name="${type}">${type}</li>`);
})
// Set event tags Click
$('[tab-name]').click((e) => {
    const tabType = e.target.getAttribute('tab-name') || '';
    $('[tab-name]').removeClass("active");
	$(`[tab-name=${tabType}]`).addClass("active");
    if (tabType === COMMON_TYPES_CONTROL.NOTE) {
        ACTIVE_NOTE_FEATURE();
    } else if (tabType === COMMON_TYPES_CONTROL.CHORD) {
        ACTIVE_CHORD_FEATURE();
    }
});

$(`[tab-name=${tagTypes[0]}]`).click();
