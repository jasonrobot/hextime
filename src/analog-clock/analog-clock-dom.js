import D from 'domfu';

const {
    documentFragment,
    slot,
    name,
} = D;

export default function render() {
    return documentFragment(
        slot([name('h1')]),
        slot([name('h2')]),
        slot([name('h3')]),
        slot([name('h4')]),
        slot([name('h5')]),
    );
}
