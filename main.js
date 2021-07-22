function getSadInterval() {
    return Date.now() + 1000;
}

function getGoneInterval () {
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
    return Date.now () + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus () {
    return Math.random() > .9;
}

let score = 0;
const MAX_SCORE = 10;

const moles = [ 
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-0')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-1')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-2')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-3')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-4')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-5')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-6')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-7')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-8')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-9')
    }
]


function getNextStatus (moles) {
    switch (moles.status) {
        case "sad":
        case "fed":
            moles.next = getSadInterval();
            moles.status = "leaving";
            if (moles.king) {
                moles.node.children[0].src = './mole-game/king-mole-leaving.png';
            }else {
                moles.node.children[0].src = './mole-game/mole-leaving.png';
            }
            break;
        case "leaving":
            moles.next = getGoneInterval();
            moles.status = "gone";
            moles.node.children[0].classList.toggle('gone', true);
            break;
        case "gone":
            moles.status = "hungry"
            moles.king = getKingStatus();
            moles.next = getHungryInterval();
            moles.node.children[0].classList.toggle("hungry", true);
            moles.node.children[0].classList.toggle("gone", false);
            if (moles.king) {
                moles.node.children[0].src = './mole-game/king-mole-hungry.png';
            } else {
                moles.node.children[0].src = './mole-game/mole-hungry.png';
            }
            break;
        case "hungry":
            moles.status = "sad";
            moles.next = getSadInterval();
            moles.node.children[0].classList.toggle("hungry", false);
            if (moles.king) {
                moles.node.children[0].src = './mole-game/king-mole-sad.png';
            }else {
                moles.node.children[0].src = './mole-game/mole-sad.png';
            }
            break;
    }
}

function feed (event) {
    if (event.target.tagName !== 'IMG' ||
    !event.target.classList.contains("hungry")) {
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)];

    mole.status = "fed";
    mole.next = getSadInterval();
    if (moles.king ) {
        score += 2;
        mole.node.children[0].src = './mole-game/king-mole-fed.png';
    } else {
        score++;
        mole.node.children[0].src = './mole-game/mole-fed.png';
    }
    mole.node.children[0].classList.remove("hungry");

    if (score >= MAX_SCORE) {
        win();
    }

    document.querySelector('.worm-container').style.width = `${score / MAX_SCORE * 100}%`;
}


function win () {
    document.querySelector('.bg').classList.add('hide');
    document.querySelector('.win').classList.remove('hide');

}


let runAgainAt = Date.now() + 100;
function nextFrame () {
    const now = Date.now();

    if (runAgainAt <= now ){
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}
document.querySelector('.bg').addEventListener('click', feed)

nextFrame();

