function slugify( Text ) {
    return Text
        .toLowerCase()
        .replace( /[^\w ]+/g, '' )
        .replace( / +/g, '-' );
}

function getInt( string ) {
    var value = string.replace( /[^\d.]/g, '' );
    value = parseInt( value );
    return value;
}