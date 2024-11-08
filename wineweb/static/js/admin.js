
$(document).ready(function() {
    var table_reservations = $('#table-reservations').DataTable({
    language: {
        url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/it-IT.json',
    },
    stateSave: true,
    processing: true, // Enable processing indicator
     // Enable server-side processing
    ajax: '/reservation/data', // Replace with your server-side endpoint URL
    autoWidth: false,
        
    
    columns: [
        { data: 'id' }, // Replace 'column1' with your column name/key
        { data: 'customer',
        width: "20%"
        },
        { data: 'date',
        width: "10%"
         }, // Replace 'column2' with your column name/key // Replace 'column2' with your column name/key
        {data: null,
        width: "3%",
        render: function(data, type, row) {
            if (row.locale == false) {
                return '<i class="material-icons"><span class="material-symbols-outlined text-success">check_circle</span></i>'
            } else {
                return '<i class="material-icons"><span class="material-symbols-outlined text-danger">cancel</span></i>';
            }

        }
        },
        
        { data: 'turn',
         width: "3%", }, // Replace 'column2' with your column name/key
        { data: 'table',
         width: "3%",}, // Replace 'column2' with your column name/key
        { data: 'shop',
         width: "20%",}, // Replace 'column2' with your column name/key
        { data: null,
        data: null, // No direct data associated with this column
            render: function(data, type, row) {
                if (row.reservation_validated && !row.charged) {
                    return '<i class="material-icons"><span class="material-symbols-outlined text-success">check_circle</span></i>';
                } else if (!row.reservation_validated && row.charged) {
                    return '<i class="material-icons"><span class="material-symbols-outlined text-primary">payments</span></i>';
                } else {
                    return '<i class="material-icons"><span class="material-symbols-outlined text-danger">cancel</span></i>';
                }
            }}, // Replace 'column2' with your column name/key
        { data: null ,
        width: "10%",
       render: function(data, type, row) {
                return '<a class="m-1 btn btn-success button-reservation-confirm" href="/admin/' + row.id + '/confirm"><i class="material-icons" style="font-size:15px">done</i></a><a class="m-1 btn btn-danger button-reservation-refuse"  href="/admin/'+row.id+'/delete"><i class="material-icons" style="font-size:15px">dangerous</i></a>';
            }
        }, // Replace 'column2' with your column name/key
        { data: null,
        width: "3%",
        render: function(data, type, row) {
                return '<a class="btn btn-primary button-reservation-charge m-1"  href="/deposit/charge/'+ row.id +'"><i class="material-icons" style="font-size:15px">euro_symbol</i></a>';
            }
        },
        {
            data: null,
            render: function(data, type, row) {
                // Check if row.note is null or undefined
                if (row.note) {
                    return '<button type="button" tabindex="0" class="btn btn-lg btn-success" data-bs-toggle="popover" data-bs-title="Note" data-bs-content="'+row.note+'" data-bs-placement="top">Note</button>';
                } else {
                    // If row.note is null or undefined, return a button without popover
                    return '<button type="button" class="btn btn-lg btn-secondary">Note</button>';
                }
            }

        }
         // Replace 'column2' with your column name/key

        // Add more columns as needed
    ],
    columnDefs: [
        {
            targets: [0],
            visible: false

        },
        {
            targets: [3, 4, 6, , 8],
            width: "7%",
            className: "text-center align-middle"
        },
        {
            targets: [1, 2, 5, 7],
            className: "align-middle text-center "
        },
        {
            targets: [5,6, 7, 8],
            sorting: false,
        }
    ]
    ,
     drawCallback: function(settings) {
        $('[data-bs-toggle="popover"]').popover();
    }

});

   var table_users = $('#table-users').DataTable({
    language: {
        url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/it-IT.json',
    },
    
    ajax: '/users/data',
    columns: [
        { data: "id",


         },
        { data: "user" },
        { data: "mail" },
        {
            data: "role",

            render: function(data, type, row) {
                if (data) {
                    return '<i class="material-icons text-success">verified_user</i>'; // Admin icon
                } else {
                    return ''; // No icon for non-admin users
                }
            }
        },
        {
    data: null,
    render: function(data, type, row) {
        // Constructing the edit button
        var editButton = '<a class="btn btn-secondary m-1" href="#"><i class="material-icons" style="font-size:15px">edit</i></a>';
        
        // Constructing the delete button (assuming row.id is used for dynamic URL)
        var deleteButton = '<a class="btn btn-danger m-1" href="/user/delete/' + row.id + '"><i class="material-icons" style="font-size:15px">delete</i></a>';

        // Combine buttons and return
        return editButton + deleteButton;
    }
}

    ]
    , "columnDefs": [
        {
                "targets": [0], // Target the third and fourth columns (0-based index)
               "visible": false, // Set the width to 5% for both columns
            },
            {
                "targets": [3], // Target the third and fourth columns (0-based index)
                "width": "5%", // Set the width to 5% for both columns
                "sorting": false
            },
            {
                "targets": [4], // Target the third and fourth columns (0-based index)
                "width": "8%" // Set the width to 5% for both columns
            },
            
           
        ]
});



    var table_customers =$("#table_customers").DataTable({
         language: {
        url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/it-IT.json',
    },
    stateSave: true,
        "columnDefs": [
            {
            "targets": [0],
            "visible": false

        },
            {
                "targets": [5,6], // Target the third and fourth columns (0-based index)
                "width": "5%", // Set the width to 5% for both columns,
                
            }
        ]
    });


    var table_turns =$("#table_turns").DataTable({
         language: {
        url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/it-IT.json',
    },
    stateSave: true,
        "columnDefs": [
            {
                "targets": [0,2, 3], // Target the third and fourth columns (0-based index)
                "width": "5%", // Set the width to 5% for both columns,
                
            }
        ]
    });

    var table_shops =$("#table_shops").DataTable({
         language: {
        url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/it-IT.json',
    },
    stateSave: true,
        "columnDefs": [
            {
                "targets": [0,8,9], // Target the third and fourth columns (0-based index)
                "width": "5%" // Set the width to 5% for both columns
            },
            {
                "targets": [2,4,5,6,7,], // Target the third and fourth columns (0-based index)
                "visible": false // Set the width to 5% for both columns
            }
        ]
    });
    var table_tables =$("#table_tables").DataTable({
         language: {
        url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/it-IT.json',
    },
    stateSave: true,
        "columnDefs": [
        {
            "targets": [0],
            "visible": false

        },

            {
                "targets": [1,3,4,5,6], // Target the third and fourth columns (0-based index)
                "width": "5%" // Set the width to 5% for both columns
            },
            
        ]
    });
    var table_schedules =$("#table_schedules").DataTable({
         language: {
        url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/it-IT.json',
    },
    stateSave: true,
        "columnDefs": [
            {
                "targets": [0,3,4,5], // Target the third and fourth columns (0-based index)
                "width": "5%" // Set the width to 5% for both columns
            },
            
        ]
    });
    

    $('.btn-delete').on('click', function(){
        var id = $(this).data('row-id');
        // Get the current href attribute
        var newHref = '/turns/delete/' + id; // Concatenate the href with the id
        $('#delete-btn').attr('href', newHref); // Set the updated href attribute
    });

    $(".edit-button").on('click', function() {
        var id = $(this).data('row-id');
        $('#turn-id-edit').val(id)        
        // Search for the row with matching data in the first column (index 0)
        var row = table_turns.rows().eq(0).filter(function(rowIdx) {
            return table_turns.cell(rowIdx, 0).data() === id.toString();
        });

        // Check if a matching row was found
        if (row.length > 0) {
            // Retrieve the data from the second column (index 1) of the matching row
            var column1Data = table_turns.cell(row, 1).data();
            
            $('#editTurn').val(column1Data)

            
            // Now, you can use 'column1Data' as needed for your edit functionality
        } else {
            console.log("No matching row found.");
        }
    });

    $('.button-reservation-confirm').on('click', function() {
        var id = $(this).data('row-id')

    })

    $('#editTurn').change(function(){

        var newHref =  '/turns/edit' + '/' + $('#turn-id-edit').val() + '/' + $('#editTurn').val()
        $('#update-btn').attr('href', newHref)

    })




    $('.btn-delete-shops').on('click', function(){
        var id = $(this).data('row-id');
        // Get the current href attribute
        var newHref = '/shops/delete/' + id; // Concatenate the href with the id
        $('#delete-btn-shops').attr('href', newHref); // Set the updated href attribute
    });

    $(".edit-button-shops").on('click', function() {
        var id = $(this).data('row-id');
        $('#shops-id-edit').val(id);

        // Search for the row with matching data in the first column (index 0)
        var row = table_shops.rows().eq(0).filter(function(rowIdx) {
            return table_shops.cell(rowIdx, 0).data() === id.toString();
        });

        // Check if a matching row was found
        if (row.length > 0) {
            // Retrieve the data from the specific row
            var rowData = table_shops.row(row).data();

            $('#name_edit').val(rowData[1]);
            $('#description_edit').val(rowData[2]);
            $('#address_edit').val(rowData[3]);
            $('#city_edit').val(rowData[4]);
            $('#cap_edit').val(rowData[5]);
            $('#provincia_edit').val(rowData[6]);
            $('#link_edit').val(rowData[7]);

            // Now, you can use the rowData for your edit functionality
        } else {
            console.log("No matching row found.");
        }
    });

    $('#submit-shops-edit').on('click', function() {
        console.log('click')
    // Serialize the form data
    var formData = $('#form-shops-edit').serialize();

    // Send an AJAX request
        $.ajax({
            url: "/shops/edit/" + $('#shops-id-edit').val(), // Specify the URL you want to send the data to
            type: "POST", // Use the appropriate HTTP method (POST or GET)
            data: formData, // Pass the serialized form data
            success: function(response) {
                // Handle the success response here
                location.reload();
            },
            error: function(error) {
                // Handle any errors that occur during the AJAX request
                console.error("Error: ", error);
            }
        });
    });

     $('.btn-delete-tables').on('click', function(){
        var id = $(this).data('row-id');
        // Get the current href attribute
        var newHref = '/tables/delete/' + id; // Concatenate the href with the id
        $('#delete-btn-tables').attr('href', newHref); // Set the updated href attribute
    });

     $(".edit-button-tables").on('click', function() {
        var id = $(this).data('row-id');
        $('#tables-id-edit').val(id);

        // Search for the row with matching data in the first column (index 0)
        var row = table_tables.rows().eq(0).filter(function(rowIdx) {
            return table_tables.cell(rowIdx, 0).data() === id.toString();
        });

        // Check if a matching row was found
        if (row.length > 0) {
            // Retrieve the data from the specific row
            var rowData = table_tables.row(row).data();

            
            $('#number-edit').val(rowData[1])
            $('#min_places-edit').val(rowData[3])
            $('#max_places-edit').val(rowData[4])
            

            // Now, you can use the rowData for your edit functionality
        } else {
            console.log("No matching row found.");
        }
    });

    $('#submit-tables-edit').on('click', function() {
        console.log('click')
    // Serialize the form data
    var formData = $('#form-tables-edit').serialize();

    // Send an AJAX request
        $.ajax({
            url: "/tables/edit/" + $('#tables-id-edit').val(), // Specify the URL you want to send the data to
            type: "POST", // Use the appropriate HTTP method (POST or GET)
            data: formData, // Pass the serialized form data
            success: function(response) {
                // Handle the success response here
                location.reload();
            },
            error: function(error) {
                // Handle any errors that occur during the AJAX request
                console.error("Error: ", error);
            }
        });
    });

    $('.btn-delete-schedules').on('click', function(){
        var id = $(this).data('row-id');
        // Get the current href attribute
        var newHref = '/schedules/delete/' + id; // Concatenate the href with the id
        $('#delete-btn-schedules').attr('href', newHref); // Set the updated href attribute
    });

    $('.edit-button-schedules').on('click', function () {
            var id = $(this).data('row-id');
            var newHref = '/schedule/edit/' + id;
            $('#edit_schedule').attr('href', newHref);

            // Make an AJAX request to your Flask route
            $.ajax({
                url: '/schedule/api/get',
                method: 'POST', // You can also use 'GET' if appropriate
                data: { id: id }, // Send the id as data to the server
                success: function (data) {
                    
                    // Handle the response data here
                    $('#name_edit').val(data.name)
                    $('#shop_edit').val(data.shop)
                    if (data.active === true) {
                        $('#active_edit').prop('checked', true)
                    }
                     
                        
                    
                    selectOptions('[name="monday_edit"]', JSON.parse(data.monday));
                    selectOptions('[name="tuesday_edit"]', JSON.parse(data.tuesday));
                    selectOptions('[name="wednesday_edit"]', JSON.parse(data.wednesday));
                    selectOptions('[name="thursday_edit"]', JSON.parse(data.thursday));
                    selectOptions('[name="friday_edit"]', JSON.parse(data.friday));
                    selectOptions('[name="saturday_edit"]', JSON.parse(data.saturday));
                    selectOptions('[name="sunday_edit"]', JSON.parse(data.sunday));
            

                    
                },
                error: function (error) {
                    // Handle any errors here
                    console.error('Error:', error);
                }
            });
        });

           
  $('.card-table').on('click', function() {
    var id = $(this).data('table-id');
    
    // Destroy the existing DataTable (if it exists)
    if ($.fn.DataTable.isDataTable('#table-tables-reservation')) {
        $('#table-tables-reservation').DataTable().destroy();
    }
   
    // Create a new DataTable using the received data
    var table_tables_reservations = $('#table-tables-reservation').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false, // Disable filtering/searching        
        "autoWidth": false,
        "info": false,
        "ajax": "/api/reservation/data/" + id,

        "columns": [
            {
                data: "id", // "id" should match the key in your data
                "visible": false,
                "sorting": false,
                "className": "align-middle"
            }, 
            { 
                data: "name",
                "sorting": false,
                width: "70%",
                "className": " align-middle"
            },
            {
                data: "time",
                "sorting": false,
                width: "10%",
                "className": "text-center align-middle"
            },
            {
                data: null,
                "sorting": false,
                 width: "10%",
                 "className": "text-center align-middle",
                render: function(data) {


                    if (data.validation === true) {
                        return '<i class="material-icons" ><span class="material-symbols-outlined text-success">check_circle</span></i>'
                    } else {
                        return '<i class="material-icons" ><span class="material-symbols-outlined text-danger">cancel</span></i>'
                    }

                    

                }
            }

            ,

            {
                data: null,
                "sorting": false,
                 width: "10%",
                 "className": "text-center align-middle",
                render: function(data) {
                    return '<button class="btn btn-success" onclick="handleConfirmClick(' + data.id + ')"><i class="material-icons" ><span class="material-symbols-outlined text-white">check</span></i></button>'

                }
            },
            {
                data: null,
                "sorting": false,
                 width: "10%",
                 "className": "text-center align-middle",
                render: function(data) {
                    
                    return '<button class="btn btn-danger" onclick="handleDeleteClick(' + data.id + ')"><i class="material-icons" ><span class="material-symbols-outlined text-white">close</span></i></button>'                          
                }
            },
            {
            data: null,
            render: function(data, type, row) {
                // Check if row.note is null or undefined
                if (row.note) {
                    return '<button tabindex="0" type="button" class="btn btn-lg btn-success" data-bs-toggle="popover" data-bs-title="Note" data-bs-content="'+row.note+'" data-bs-placement="top">Note</button>';
                } else {
                    // If row.note is null or undefined, return a button without popover
                    return '<button type="button" class="btn btn-lg btn-secondary">Note</button>';
                }
            }

        }

        ],

     drawCallback: function(settings) {
        $('[data-bs-toggle="popover"]').popover();
    }
    });

    // Show the modal
    $('#salaModal').modal('show');
       


});

  $('#close_modal').on('click', function(){
    location.reload();
  })




});

function handleConfirmClick(id) {
    $.ajax({
        url: '/admin/reservation/confirm',
        method: 'POST',
        data: { id: id },
        success: function(data) {
            $('#table-tables-reservation').DataTable().ajax.reload()
           location.reload()

        }

        

    })
}



function handleDeleteClick(id) {
    $.ajax({
        url: '/admin/reservation/delete',
        method: 'POST',
        data: { id: id },
        success: function(data) {
            $('#table-tables-reservation').DataTable().ajax.reload()
            location.reload()

        }

        

    })
}

function selectOptions(selector, values) {
    var select = $(selector);
    

    // Iterate through the options in the select element
    select.find('option').each(function () {
        var option = $(this);
        var optionValue = option.val();

        // Iterate through the values and select matching options
        values.forEach(function (value) {
            if (parseInt(optionValue) === parseInt(value)) {
                option.prop('selected', true);
            }
        });
    });
}



$('#reservation-confirm').on('click', function() {
    if ($('#sala_select').val() === null) {
    var sala_select = $('#sala2_select').val()
} else {
    var sala_select = $('#sala_select').val()
}
    var data = {
        nome : $("#floatingName").val(),
        data : $("#floatingDate").val(),        
        tavolo: $("#floatingSelect").val(),
        turno:  $("#floatingSelectTurn").val(),
        people : $('#floatingPeople').val(),
        note : $('#floatingNote').val(),
        phone : $('#floatingPhone').val(),
        id: $('#shop-selected').val()

    }
    
    $.ajax({
        url: '/admin/reservation/insert',
        method : 'POST',
        data : data,
        success: function(data) {
           location.reload() 
        }

    })

})





  function format(rowData) { 
    var childTable = '<tr>' +
          '<td></td>' +
            '<td>Brown, John</td>' +
            '<td>Staff</td>' +
            '<td>50</td>' +
            '<td>$2,500</td>' +
            '<td>$1,500</td>' +
          '</tr>'+
          '<tr>' +
            '<td></td>' +
            '<td>Smith, Mary</td>' +
            '<td>Consultant</td>' +
            '<td>50</td>' +
            '<td>$2,500</td>' +
            '<td>$1,000</td>' +
          '</tr>' ;
    return childTable;
  }
  




const table_reservations_control = $('#table-reservation-control').DataTable({
    "ajax": "/admin/reservation/control/api",
    'dom' : 't',

    "columns" : 
    [
        {
        'className': 'details-control',
        'orderable': false,
        'data': null,
        'defaultContent': ''
      },
        {data:"number"},
        {data: "shop"},
        
        {data : null}

        ] 


})


$(document).ready(function () {
    var dateSelected = new Date();
    var day = dateSelected.getDate();
    var month = dateSelected.getMonth() + 1; // January is 0, so we add 1
    var year = dateSelected.getFullYear();

    // Padding day and month if they are single digits
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var formattedDate = year + '-' + month + '-' + day;

    var currentData = null;

    function modalEdit(data) {
        $('#floatingSelect').val(data.number);
        $('#floatingSelectTurn').empty(); // Clear previous options
        $('#shop-selected').val(data.id);
        // Append each turn as an option
        data.turns.forEach(function (turn) {
            $('#floatingSelectTurn').append('<option value="' + turn.id + '">' + turn.description + '</option>');
        });
    }

    function format(d) {
        if (!d.reservations || d.reservations.length === 0) {
            return '<table class="table table-responsive table-striped">' +
                   '<thead>' +
                   '<th>Turno</th>' +
                   '<th>Prenotazione</th>' +
                   '<th>Note</th>' +
                   '<th>Disdici</th>' +
                   '</thead>' +
                   '<tbody>' +
                   '<tr>' +
                   '<td colspan="2">Nessuna Prenotazione</td>' +
                   '</tr>' +
                   '</tbody>' +
                   '</table>';
        }

        var rows = d.reservations.map(function (reservation) {
            return '<tr>' +
                   '<td>' + reservation.time + '</td>' +
                   '<td>' + reservation.name + '</td>' +
                   '<td>' + reservation.note + '</td>' +
                   '<th><button class="btn btn-danger" onclick="handleDeleteClick(' + reservation.id + ')"><i class="material-icons"><span class="material-symbols-outlined text-white">close</span></i></button></th>' +
                   '</tr>';
        }).join('');

        return '<table class="table table-responsive table-striped">' +
               '<thead>' +
               '<th>Turno</th>' +
               '<th>Prenotazione</th>' +
               '<th>Note</th>' +
               '<th>Disdici</th>' +
               '</thead>' +
               '<tbody>' +
               rows +
               '</tbody>' +
               '</table>';
    }

    var table = $('#example').DataTable({
        'dom': 'ftp',
        "ajax": '/admin/reservation/control/api/' + formattedDate,
        "processing": true,
        "filter": false,
        'columns': [
            {
                'className': 'dt-control',
                'orderable': false,
                'data': null,
                'defaultContent': ''
            },
            {"data": 'number'},
            {"data": 'shop'},
            {"data": 'reservations_count'},
            {
                "data": null,
                "render": function(data) {
                    // Serialize data as JSON string for safe passing
                    var dataStr = JSON.stringify(data);
                    return '<button class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#newResModal" onclick=\'setCurrentData(' + dataStr + ')\'>Nuovo</button>';
                }
            }
        ],
        'columnDefs': [
            {
                'targets': [0, 1, 3, 4],
                'width': '10px',
                'className': "text-center"
            },
            {
                'targets': [2],
                'className': 'dt-left'
            }
        ]
    });

    // Add event listener for opening and closing details
    table.on('click', 'td.dt-control', function (e) {
        let tr = e.target.closest('tr');
        let row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        } else {
            // Open this row
            row.child(format(row.data())).show();
        }
    });

    // Set current data for modal
    window.setCurrentData = function(dataStr) {
        modalEdit(dataStr);
    };

    // Refresh table on date change
    $('#reservation-date').on('change', function () {
        var selectedDate = $(this).val();
        var elements = document.getElementsByClassName("floatingDateReservation");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = selectedDate;
    }

        var newUrl = '/admin/reservation/control/api/' + selectedDate;
        table.ajax.url(newUrl).load();
    });

    // Set the initial value of the date input to today's date
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var todayDate = year + "-" + month + "-" + day;

    var elements = document.getElementsByClassName("floatingDateReservation");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = todayDate;
    }
});


window.onload = function() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var todayDate = year + "-" + month + "-" + day;

    var elements = document.getElementsByClassName("floatingDateReservation");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = todayDate;
    }
};
