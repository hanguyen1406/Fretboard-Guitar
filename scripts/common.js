const COMMON_TYPES_CONTROL = {
	NOTE: "NOTE",
	CHORD: "CHORD",
};

const COMMON_CONTENT_HTML_BASE = `
	<!-- partial:index.partial.html -->
	<h1>Guitar Fretboard Visualization</h1>
	<div class="guitar-neck">
		<div class="fret first"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>
		<div class="fret"></div>

		<ul class="dots">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
		<ul class="strings">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>

		<ul class="open-notes">
			<li class="low-e">E</li>
			<li class="b">B</li>
			<li class="g">G</li>
			<li class="d">D</li>
			<li class="a">A</li>
			<li class="high-e">E</li>
		</ul>
		<div class="notes">
			<div class="mask low-e">
				<ul></ul>
			</div>
			<div class="mask a">
				<ul></ul>
			</div>
			<div class="mask d">
				<ul></ul>
			</div>
			<div class="mask g">
				<ul></ul>
			</div>
			<div class="mask b">
				<ul></ul>
			</div>
			<div class="mask high-e">
				<ul></ul>
			</div>
		</div>
		<div class="red-dots">
			<div class="red-dot low-e">
				<ul></ul>
			</div>
			<div class="red-dot a">
				<ul></ul>
			</div>
			<div class="red-dot d">
				<ul></ul>
			</div>
			<div class="red-dot g">
				<ul></ul>
			</div>
			<div class="red-dot b">
				<ul></ul>
			</div>
			<div class="red-dot high-e">
				<ul></ul>
			</div>
		</div>
		<ul class="compartment-number"></ul>
	</div>

	<div class="controls"></div>
	<!-- partial -->
`;

const COMMON_SET_BUTTON_CLICK = () => {
    $('[button-click]').click((e) => {
        $('[button-click]').removeClass("active");
        $(`#${e.target.id}[button-click]`).addClass("active");
    });
};

const COMMON_NOTES = {
    e: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
    a: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', "A"],
    d: ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
    g: ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
    b: ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
};


const COMMON_CHORDS = {
	majors: [
		{
			name: "C",
			strings: [
				null,
				{ finger: 1, fret: 1 },
				null,
				{ finger: 2, fret: 2 },
				{ finger: 3, fret: 3 },
				null,
			]
		},
		{
			name: "D",
			strings: [
				{ finger: 2, fret: 2 },
				{ finger: 3, fret: 3 },
				{ finger: 1, fret: 2 },
				null,
				null,
				null,
			]
		},
		{
			name: "E",
			strings: [
				null,
				null,
				{ finger: 1, fret: 1 },
				{ finger: 3, fret: 2 },
				{ finger: 2, fret: 2 },
				null,
			]
		},
		{
			name: "F",
			strings: [
				{ finger: 1, fret: 1 },
				{ finger: 1, fret: 1 },
				{ finger: 2, fret: 2 },
				{ finger: 3, fret: 3 },
				{ finger: 4, fret: 3 },
				{ finger: 1, fret: 1 }
			]
		},
		{
			name: "G",
			strings: [
				{ finger: 3, fret: 3 },
				null,
				null,
				null,
				{ finger: 1, fret: 2 },
				{ finger: 2, fret: 3 }
			]
		},
		{
			name: "A",
			strings: [
				null,
				{ finger: 2, fret: 2 },
				{ finger: 3, fret: 2 },
				{ finger: 4, fret: 2 },
				null,
				null
			]
		},
		{
			name: "B",
			strings: [
				{ finger: 1, fret: 2 },
				{ finger: 4, fret: 4 },
				{ finger: 3, fret: 4 },
				{ finger: 2, fret: 4 },
				{ finger: 1, fret: 2 },
				null,
			]
		},
	],
	minors: [
		{
			name: "Cm",
			strings: [
				{ finger: 1, fret: 3 },
				{ finger: 2, fret: 4 },
				{ finger: 4, fret: 5 },
				{ finger: 3, fret: 5 },
				{ finger: 1, fret: 3 },
				null,
			]
		},
		{
			name: "Dm",
			strings: [
				{ finger: 1, fret: 1 },
				{ finger: 3, fret: 3 },
				{ finger: 2, fret: 2 },
				null,
				null,
			]
		},

		{
			name: "Em",
			strings: [
				null, // 1
				null, // 2
				null, // 3,
				{ finger: 3, fret: 2 }, // 4
				{ finger: 2, fret: 2 }, // 5
				null, // 6

			]
		},
		{
			name: "Fm",
			strings: [
				{ finger: 1, fret: 1 }, // 1
				{ finger: 1, fret: 1 }, // 2
				{ finger: 2, fret: 2 }, // 3,
				{ finger: 4, fret: 3 }, // 4
				{ finger: 3, fret: 3 }, // 5
				{ finger: 1, fret: 1 }, // 6

			]
		},
		{
			name: "Gm",
			strings: [
				{ finger: 1, fret: 3 }, // 1
				{ finger: 1, fret: 3 }, // 2
				{ finger: 1, fret: 3 }, // 3,
				{ finger: 4, fret: 5 }, // 4
				{ finger: 3, fret: 5 }, // 5
				{ finger: 1, fret: 3 }, // 6

			]
		},
		{
			name: "Am",
			strings: [
				null, // 1
				{ finger: 1, fret: 1 }, // 2
				{ finger: 3, fret: 2 }, // 3,
				{ finger: 2, fret: 2 }, // 4
				null, // 5
				null, // 6

			]
		},
		{
			name: "Bm",
			strings: [
				{ finger: 1, fret: 2 },
				{ finger: 2, fret: 3 }, // 2
				{ finger: 4, fret: 4 }, // 3,
				{ finger: 3, fret: 4 }, // 4
				{ finger: 1, fret: 2 }, // 5
				null, // 6

			]
		},
	],
};