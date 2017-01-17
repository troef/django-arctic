/*
    appends a template to element on click
    * when a template has form fields, then it updates the unique id and name (for labels for attr)
    * safely clones selectize selectboxes

    required arguments:
    * data-template = CSS selector to template
    * data-template-button = button to trigger append()

    dependecies:
    * helpers.js ( getInt )
    * selectize
 */

( function ( $ ) {
    'use strict'


    function appendTemplate ( element ) {
        this.element = $( "[data-template][data-template-button]" );
        this.templateClass = this.element.data( 'template' );
        this.template = this.element.find( this.templateClass );
        this.button = this.element.data( 'template-button' );
        this.button = this.element.parent().find( this.button );

        // when there's no template and button found in DOM
        if ( !this.template.length && !this.button.length ) {
            throw new Error( 'Cannot find template' );
        }

        var self = this;
        self.init();
    };


    appendTemplate.prototype.init = function ( ) {
        var self = this;

        self.createTemplate();

        self.button.on( 'click', function () {
            self.appendTemplate();
        });
    };


    // create an template within self.template
    appendTemplate.prototype.createTemplate = function ( ) {
        var self = this;

        // is selectize loaded?
        if ( jQuery().selectize ) {

            // if there's a selectize selectbox, destroy it before cloning
            var select = self.template.find( 'select' );

            if ( select.length ) {
                var selectize = select[0].selectize.destroy();
            }
        }


        // remove template indentifier
        self.template.removeClass( self.templateClass.substring(1) ); // remove . in classname

        // clone template
        self.templateCache = self.template; // so we can delete it
        self.template = self.template.clone();

        // remove orignal template and cache object
        self.templateCache.remove();
        delete self.templateCache;
    };


    // appends a template
    appendTemplate.prototype.appendTemplate = function ( ) {
        var self = this;

        // create an instance of template to append
        var template = self.template.clone();

        // update ids of appended fields
        template = self.updateIDs( template );

        // append template
        self.element.append( template );

        // re-initiate selectize
        selectize();

        // trigger sortable recalc
        self.element.trigger( 'append' );
    };


    // updates id's of form fields and labels within argrumented templat
    appendTemplate.prototype.updateIDs = function ( template ) {
        var self = this

        // get elements that has an unique id which need to be updated
        var label = template.find( 'label' );
        var input = template.find( 'input:not( [type="submit"] )' );
        var select = template.find( 'select' );
        var textarea = template.find( 'textarea' );

        var fields = label.add( input ).add( select ).add( textarea );

        if ( fields.length ) {

            if ( !self.id ) {
                self.id = {};
                self.id.init = fields.last().attr('id');
                self.id.init = window.arctic.utils.getInt( self.id.init );
            }

            // set new current id
            if ( self.id.current ) {
                self.id.current++;
            } else {
                self.id.current = parseInt( self.id.init );
            }

            // update id's in template
            for ( var i = 0; i < fields.length; i++ ) {
                var element = fields[i];

                if ( element.nodeName == 'LABEL' ) {
                    var target = element.htmlFor;
                    element.htmlFor = target.replace( self.id.init, self.id.current );
                } else {
                    var name = element.name;
                    element.name = name.replace( self.id.init, self.id.current );

                    var id = element.id;
                    element.id = id.replace( self.id.init, self.id.current );
                }
            }
        };

        return template;
    };


    $(document).ready(function() {
        new appendTemplate();
    });


} )( jQuery );

/*
    TODO
    selectize.js

    selectize.destroy();
    selectize.reinit();
*/