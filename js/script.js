(function ($) {
    var ipAddress='';
    $('.contact-form').submit(function (e) {
        e.preventDefault();
        var that = $(this);
        var formMessages = $(this).find('.form-message-new');
        $(this).find('.submitButton').attr("disabled",true);
        let payload ={
            "ACT":"BOOKING",
            "NAME": $(this).find('.name').val(),
            "MOBILENO": $(this).find('.phone').val(),
            "EMAILID": $(this).find('.email').val(),
            "DESTINATIONNAME": $(this).find('.destinationname').val(),
            "DEPARTURECITY": $(this).find('.departurename').val(),
            "DEPARTURETYPEID": 1,
            "DEPARTUREDATE": $(this).find('.departure_date').val(),
            "NOOFDAYS": 0,
            "DEPARTUREMONTH": "",
            "DEPARTUREYEAR": "",
            "DEPARTUREWEEK": "",
            "PACKAGESTARID": 1,
            "ISFLIGHT": "",
            "BUDGETID": 1,
            "ADULT":$(this).find('.numberofpeople').val(),
            "CHILD": "",
            "INFANT": "",
            "IWILLBOOKID": "",
            "KEYWORDID":2,
            "HOSTIP":ipAddress,
            "PAGENAME":$(this).find('.PAGENAME').val()
        };
        $.ajax({
                type: 'POST',
                url: 'https://lockyourtrip.com/bypass.php?LOGKEY=LYT_fUp54gssJaF6jmd_aqe96hMseR9svR',
                data: payload
            })
            .done(function (response) {
                window.location.href =that.attr('action');
            })
            .fail(function (data) {
                $('.submitButton').attr("disabled",false);
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                if (data.responseText !== '') {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    });
    $( ".destinationname" ).autocomplete({
        source: function( request, response ) {
            $.ajax( {
              url: "https://lockyourtrip.com/bypass.php?LOGKEY=LYT_fUp54gssJaF6jmd_aqe96hMseR9svR&ACT=SEARCHDESTINATION",
              dataType: "GET",
              dataType: "json",
              data: {
                DESTINATIONNAME: request.term
              },
              success: function( data ) {
                response($.map(data.result, function (item) {
                    return {
                        label: item.destinationname,
                        value: item.destinationname
                    };
                }));
              }
            } );
        },
        minLength: 2,
        select: function( event, ui ) {
            
        }
    });
    $( ".departurename" ).autocomplete({
        source: function( request, response ) {
            $.ajax( {
              url: "https://lockyourtrip.com/bypass.php?LOGKEY=LYT_fUp54gssJaF6jmd_aqe96hMseR9svR&ACT=SEARCHDEPARTURE",
              dataType: "GET",
              dataType: "json",
              data: {
                DEPARTURENAME: request.term
              },
              success: function( data ) {
                response($.map(data.result, function (item) {
                    return {
                        label: item.departurecity,
                        value: item.departurecity
                    };
                }));
              }
            } );
        },
        minLength: 2,
        select: function( event, ui ) {
            
        }
    });

    getIPAddress();
    function getIPAddress()  
    {  
        $.ajax({
            type: 'GET',
            url: 'https://api.ipify.org/?format=json',
        })
        .done(function (response) {
            ipAddress = response.ip;
        })
    }
    setDefaultDate();
    function setDefaultDate()
    {
        var month='';
        var day='';
        var now = new Date();
        now.setDate(now.getDate());
        month = (now.getMonth() + 1);               
        day = now.getDate();
        if (month < 10) 
            month = "0" + month;
        if (day < 10) 
            day = "0" + day;
        var todayMin = now.getFullYear()+ '-' + month + '-' + day;
        $('.departure_date').attr('min',todayMin);


        var month='';
        var day='';
        var now = new Date();
        now.setDate(now.getDate() + 7);
        month = (now.getMonth() + 1);               
        day = now.getDate();
        if (month < 10) 
            month = "0" + month;
        if (day < 10) 
            day = "0" + day;
        var today = now.getFullYear()+ '-' + month + '-' + day;
        $('.departure_date').val(today);
    }
    $(".phone").keypress(function(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode < 48 || charCode > 57)) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    });
}(jQuery));