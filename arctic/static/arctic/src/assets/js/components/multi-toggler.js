( function ( $ ) {

    function Toggler( elements ) {

        if ( elements instanceof jQuery ) {
            this.elements = elements;
        } else {
            throw new Error( 'toggler expects a jQuery object' );
        }

        var self = this;
        self.init();
    }

    Toggler.prototype.init = function ( ) {
        var self = this;

        // create a listener for all elements
        for ( var i = 0; i < self.elements.length; i++ ) {

            // get clicked element as a jQuery object
            self.element =  $( self.elements[ i ] );

            // listen
            self.element.on( 'click', function ( ) {
                self.toggle( this );
            })
        }
    }

    // toggle classes
    Toggler.prototype.toggle = function ( element ) {
        var self = this;

        self.element =  $( element );

        // select elements who needs to be toggled
        self.open = self.element.data( 'open' );
        self.close = self.element.data( 'close' );

        if ( self.open ) {
            self.open = $( '#' + self.open );
        }
        if ( self.close ) {
            self.close = $( '#' + self.close );
        }

        // get classes who needs to be toggled and toggle these
        self.open.toggleClass = self.open.data( 'toggler' );
        self.close.toggleClass = self.open.data( 'toggler' );

        self.open.removeClass( self.open.toggleClass );
        self.close.addClass( self.close.toggleClass );

        // add active class for possible styling purposes
        self.elements.removeClass( 'is-active' );
        self.element.addClass( 'is-active' );
    }

    // iniate
    $( document ).ready( function() {
        var elements = $( '[data-multi-toggler][data-open][data-close]' );
        new Toggler( elements );
    })
} )( jQuery );