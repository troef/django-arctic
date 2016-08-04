"use strict";

( function () {

    // required fields
    var element = $( '.query-builder' );
    var filters = element.data( 'filters' );


    if ( element.length && filters != undefined ) {

        // settings
        var settings = {};
        settings.icons = {
            add_group: 'fa fa-plus-square',
            add_rule: 'fa fa-plus-circle',
            remove_group: 'fa fa-minus-square',
            remove_rule: 'fa fa-minus-circle',
            error: 'fa fa-exclamation-triangle'
        }
        settings.allow_groups = 1;
        settings.filters = {};
        settings.filters = filters;

        var conditions = element.data( 'conditions' );
        if ( conditions != "{}" ) {
            settings.rules = conditions;
        }

        // init querybuilder
        element.queryBuilder( settings );

        // get form elements
        var form = element.closest( 'form' );
        var submit = form.find( '[type="submit"]' );

        // save rules
        submit.on( 'click', function ( event ) {
            var result = element.queryBuilder( 'getRules' );

            if ( !$.isEmptyObject( result ) ) {
                $( '#id_conditions' ).val( JSON.stringify( result, null, 2 ) );
            }
        } );
    }
} )();