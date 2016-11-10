function selectize() {
    var s = $( 'select.js-selectize' );

    if ( s.size() || !s.selectize) {
        s.each(function(){

            console.log( 'init selectize ')

            $( this ).selectize({
                allowEmptyOption: true,
                highlight: false,
                plugins: ['remove_button']
            })
        })
    }

    var s_tags = $( 'select.js-selectize-tags' );

    if ( s_tags.size() || !s_tags.selectize ) {
        s_tags.each(function(){

            console.log( 'init tags selectize' )

            $( this ).selectize({
                delimiter: ',',
                persist: false,
                plugins: ['remove_button'],
                create: function(input) {
                    return {
                        value: input,
                        text: input
                    }
                }
            })
        })
    }

    s.on( 'initialize', initializethis );
    s_tags.on( 'initialize', initializethis );

    var initializethis = function() { alert('js-selectize is initialized') };
}

selectize();