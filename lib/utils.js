export function makeSerializable(o) {
    return JSON.parse(JSON.stringify(o, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}