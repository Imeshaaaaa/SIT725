const clickMe = () => {
    alert("Hey, you clicked me!")
}

$(document).ready(function(){
    $('#clickMeButton').click(()=>{
        clickMe();
    })
});
    