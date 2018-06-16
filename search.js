/*
This function estimate the accuracy of search
*/
function similar(a,b) {
  a=a.toLowerCase();
  b=""+b+"".toLowerCase();
    var lengthA = a.length;
    var lengthB = b.length;
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;
    var maxLength = (a.length < b.length) ? b.length : a.length;
    for(var i = 0; i < minLength; i++) {
        if(a[i] == b[i]) {
            equivalency++;
        }
    }


    var weight = equivalency / maxLength;
    return (weight * 100);
}

/*
this function is used to get the data from json file and split it into the js objects as per requirements.
*/
 function getup()
{
//document.getElementById('head').innerHtml='';
var score=[];
var title=[];
var url=[];
var platform=[];
var genre=[];
var edit=[];
var rdate=[];
var a=$('#search').val();
$.ajax({
    url:"gamesext.json",
  method:"post",
  data:{},
  success:function(data)
  {
  var tunna=data;

  var i;
  var j=0;
  var text="";
for (i = 0; i < tunna.length; i++) {
    //text += '<strong style="color:green;"> title of the game</strong> :'+tunna[i].score + '<br>';
  var weight=similar(a,tunna[i].title);
  if(weight>=30)
   {
     score[j]=tunna[i].score ;
       title[j]=tunna[i].title ;
       url[j]=tunna[i].url ;
       platform[j]=tunna[i].platform;
       genre[j]=tunna[i].genre;
       edit[j]=tunna[i].editors_choice;
       rdate[j]=tunna[i].release_year;
     j=j+1;
  }
}
if(score.length==0)
var html='<div class="col col-sm-12 col-md-12" style="color:white;text-align:center;font-size:20px;">Sorry! Try With New Keyword!</div><br><hr>';
else {
insertionSort(score,title,url,platform,genre,edit,rdate,score.length);
var html='<div class="col col-sm-12 col-md-12" style="color:white;text-align:center;font-size:30px;">Filtered Contents</div><br><hr>';
for(k=score.length-1;k>=0;k--)
{var color=(edit[k]=='Y') ? 'color:green;' : 'color:red';
 //$('.container').append(score[k]+" "+title[k]+" "+url[k]+" "+platform[k]+" "+genre[k]+" "+edit[k]+" "+rdate[k]+'<br>');
 html+='<div class="card" style="width: 18rem;"><div class="card-body"> <h5 class="card-title">'+title[k]+'</h5>'+
 '<h6 class="card-subtitle mb-2 text-muted">'+platform[k]+'</h6><p class="card-text"><Strog>Rating(<i class="fa fa-star"></i>):'+score[k]+'/10<span class=""</strong><br>'+
  '<strong>'+genre[k]+'</strong><br><button class="btn btn-primary btn-sm" id="'+k+'xy" onclick="ftoggle('+k+')">editor_choice?</button><span id="'+k+'" style="display:none;font-weight:bold;'+color+'">'+edit[k]+'</span></p><div class="progress">'+
  '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:'+(score[k]*10)+'%;height:50%;background-color:black">'+
    '<span class="sr-only">'+(score[k]*10)+'% Complete</span></div></div></div></div>';

}
}
  //$('.container').prepend(text);
  $('#content').html(html);
  }
})
}
/* this is used to sort the score array by score.*/
function insertionSort(arr,title,url,platform,genre,edit,rdate, n)
{
   var i;
var key;
var  j;
   for (i = 1; i < n; i++)
   {
       key = arr[i];
     key1=title[i];
     key2=url[i];
     key3=platform[i];
     key4=genre[i];
     key5=edit[i];
     key6=rdate[i]
       j = i-1;

       /* Move elements of arr[0..i-1], that are
          greater than key, to one position ahead
          of their current position */
       while (j >= 0 && arr[j] > key)
       {
           arr[j+1] = arr[j];
       title[j+1]=title[j];
       url[j+1]=url[j];
       platform[j+1]=platform[j];
       genre[j+1]=genre[j];
       edit[j+1]=edit[j];
       rdate[j+1]=rdate[j]
           j = j-1;
       }
       arr[j+1] = key;
     title[j+1]=key1;
     url[j+1]=key2;
     platform[j+1]=key3;
     genre[j+1]=key4;
     edit[j+1]=key5;
     rdate[j+1]=key6;
   }
}
/* used to find the top 10 rated games */
function rated()
{
  setTimeout(function() {
        swal({
            title: "Games Arena!",
            text: "Go Ahead And Browse Your Favorite Games",
            imageUrl: "favicon.png",
        }, );
    }, 100);
  var html='';
  var score=[];
  var title=[];
  var url=[];
  var platform=[];
  var genre=[];
  var edit=[];
  var rdate=[];
$.ajax({
   url:"gamesext.json",
 method:"post",
 data:{},
 success:function(data)
 {
 var tunna=data;

 var i;
 var text="";
for (i = 0; i < tunna.length; i++) {
    score[i]=tunna[i].score ;
      title[i]=tunna[i].title ;
      url[i]=tunna[i].url ;
      platform[i]=tunna[i].platform;
      genre[i]=tunna[i].genre;
      edit[i]=tunna[i].editors_choice;
      rdate[i]=tunna[i].release_year;
 }
  insertionSort(score,title,url,platform,genre,edit,rdate,score.length);
  var html='<div class="col col-sm-12 col-md-12" style="color:white;text-align:center;font-size:30px;">Most Rated Games</div><br><hr>';
for(k=score.length-1;k>=score.length-10;k--)
{
  var color=(edit[k]=='Y') ? 'color:green;' : 'color:red';
html+='<div class="card" style="width: 18rem;"><div class="card-body"> <h5 class="card-title">'+title[k]+'</h5>'+
'<h6 class="card-subtitle mb-2 text-muted">'+platform[k]+'</h6><p class="card-text"><Strog>Rating(<i class="fa fa-star" style="color:#335ee0"></i>):'+score[k]+'/10<span class=""</strong><br>'+
 '<strong>'+genre[k]+'</strong><br><button class="btn btn-primary btn-sm" id="'+k+'xy" onclick="ftoggle('+k+')">editor_choice?</button><span id="'+k+'" style="display:none;font-weight:bold;'+color+'">'+edit[k]+'</span></p><div class="progress">'+
 '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:'+(score[k]*10)+'%;height:50%;background-color:black">'+
   '<span class="sr-only">'+(score[k]*10)+'% Complete</span></div></div></div></div>';

}

 $('#content').html(html);
 }
})
}
function ftoggle(id)
{
  $(document).ready(function(){

$("#"+id+"xy").hide();
$("#"+id).show();

  })
}
