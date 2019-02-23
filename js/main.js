var currentBoard;

$(document).on('click','#add-girl-button', function(){
    var stored = localStorage['girlDate'];
    var girlDate = [[],[],[]];

    if (stored) girlDate = JSON.parse(stored); else girlDate = [[],[],[]];
    console.log(girlDate);
    console.log(girlDate[0].length);

    girlDate[0].push($('#img-link').val());
    girlDate[1].push($('#name').val());
    girlDate[2].push(0);

    localStorage['girlDate'] = JSON.stringify(girlDate);

    showList();

    $("#export").val(JSON.stringify(girlDate));
    $('#img-link').val('');
    $('#name').val('');
});

$(document).ready(function () {

    currentBoard = localStorage['current']?JSON.parse(localStorage['current']):0;


    var localBoards = localStorage['localBoards'];
    var boards = [];
    if (localBoards) boards = JSON.parse(localBoards); else boards = [];
    var girlDate = boards[currentBoard]?boards[currentBoard]:[[],[],[]];
    //Получение экспорта
    // var stored = localStorage['girlDate'];
    // var girlDate = [[],[],[]];
    // if (stored) girlDate = JSON.parse(stored); else girlDate = [[],[],[]];



    showList();
    $("#export").val(JSON.stringify(girlDate));

})

function sortGirls() {
    var i, j;

    var localBoards = localStorage['localBoards'];
    var boards = [];
    if (localBoards) boards = JSON.parse(localBoards); else boards = [];
    var girlDate = boards[currentBoard]?boards[currentBoard]:[[],[],[]];

    for(i = 0; i < girlDate[0].length-1; i++){
        for(j = i; j < girlDate[0].length; j++){
            if (girlDate[2][j]>girlDate[2][i]){
                var tmp = [girlDate[0][i], girlDate[1][i], girlDate[2][i]];
                girlDate[0][i] = girlDate[0][j];
                girlDate[1][i] = girlDate[1][j];
                girlDate[2][i] = girlDate[2][j];
                girlDate[0][j] = tmp[0];
                girlDate[1][j] = tmp[1];
                girlDate[2][j] = tmp[2];
            }
        }
    }

    localStorage['girlDate'] = JSON.stringify(girlDate);
    $("#export").val(JSON.stringify(girlDate));

    if (JSON.stringify(tmpDate) === JSON.stringify(girlDate[1])) return true; else showList();
    showList()
}

function showList(){
    // var stored = localStorage['girlDate'];
    var i = 0;
    // var girlDate = [[],[],[]];

    // if (stored) girlDate = JSON.parse(stored); else girlDate = [[],[],[]];

    var localBoards = localStorage['localBoards'];
    var boards = [];
    if (localBoards) boards = JSON.parse(localBoards); else boards = [];
    var girlDate = boards[currentBoard]?boards[currentBoard]:[[],[],[]];

    console.log(girlDate);
    console.log(girlDate[0].length);

    // $('#inner-div').fadeOut("slow");
    $('#inner-div').html('');

    for (i = 0;  i < girlDate[0].length; i++){
        if (i == 5) {
            $('#inner-div').append('<div class="row row-special">\n' +
                '                        <div class="col-12">Остальные</div>\n' +
                '                    </div>');
        }
        $('#inner-div').append(
            '                    <div class="row row-' + (((i % 2) == 1)?('even'):('odd')) + '">\n' +
            '                        <div class="col-1">\n' +
            '                            <div class="table-text">\n' +
            '                                '+ ((i==0)?('<i class="fas fa-crown" style="color: hotpink"></i>\n'):(i+1)) +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="col-2">\n' +
            '                            <div class="img-small-borders">\n' +
            '                                <img src="'+ girlDate[0][i]+'" class="img-small">\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="col-6">\n' +
            '                            <div class="table-text">\n' +
            '                                '+ girlDate[1][i] + '\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="col-3">\n' +
            '                            <div class="table-text">\n' +
            '                                <i class="fas fa-heart-broken add-button heart" id="broken-heart-' + i + '"></i><span id="heart-count-'+ i +'"> '+ girlDate[2][i] + '</span> <i class="fas fa-heart add-button heart" id="heart-'+ i +'"></i>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>'
        )
    }
    // $('#inner-div').fadeIn(500);
}

$(document).on('click', 'i[id^="heart-"]', function (e) {
    e.preventDefault();
    var id = this.id;
    id = id.slice(6, id.length);
    id = parseInt(id);

    // var stored = localStorage['girlDate'];
    // var girlDate = [[],[],[]];

    // if (stored) girlDate = JSON.parse(stored); else girlDate = [[],[],[]];

    var localBoards = localStorage['localBoards'];
    var boards = [];
    if (localBoards) boards = JSON.parse(localBoards); else boards = [];
    var girlDate = boards[currentBoard]?boards[currentBoard]:[[],[],[]];

    girlDate[2][id]++;
    localStorage['girlDate'] = JSON.stringify(girlDate);

    $('#heart-count-'+id).html(' ' + girlDate[2][id] + ' ');

    sortGirls();
});

$(document).on('click', 'i[id^="broken-heart-"]', function (e) {
    e.preventDefault();
    var id = this.id;

    id = id.slice(13, id.length);
    id = parseInt(id);
    console.log(id);


    // var stored = localStorage['girlDate'];
    // var girlDate = [[],[],[]];

    // if (stored) girlDate = JSON.parse(stored); else girlDate = [[],[],[]];

    var localBoards = localStorage['localBoards'];
    var boards = [];
    if (localBoards) boards = JSON.parse(localBoards); else boards = [];
    var girlDate = boards[currentBoard]?boards[currentBoard]:[[],[],[]];

    girlDate[2][id]--;
    localStorage['girlDate'] = JSON.stringify(girlDate);

    $('#heart-count-'+id).html(' ' + girlDate[2][id] + ' ');

    sortGirls();
});

$(document).on('click','#import-btn', function(){
    var localBoards = localStorage['localBoards'];
    var boards = [];
    if (localBoards) boards = JSON.parse(localBoards); else boards = [];

    boards[currentBoard] = JSON.parse($("#import").val());
    localStorage['localBoards'] = JSON.stringify(boards);

    showList();
});