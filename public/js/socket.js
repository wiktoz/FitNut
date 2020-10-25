var socket = io();
var pickedItems = {};
var user = {};
var waf = [1.45,1.7,1.9,2.1,2.35];
var total = {kcal:0,kJ:0,fats:0,carbohydrates:0,sugars:0,fibers:0,proteins:0,sodium:0,cholesterol:0,caffeine:0};
var max = {kcal:2000,kJ:8400,fats:70,carbohydrates:270,sugars:90,fibers:25,proteins:50,sodium:2.4,cholesterol:0.3,caffeine:0.4};

if(Cookies.get('pickedItems')) pickedItems = JSON.parse(Cookies.get('pickedItems'));
if(Cookies.get('totalValues')) total = JSON.parse(Cookies.get('totalValues'));
if(Cookies.get('max')) max = JSON.parse(Cookies.get('max'));
if(Cookies.get('user')) user = JSON.parse(Cookies.get('user'));

function round(num){
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}
function animateNumbers(to,max,selector){
    var from,unit=" g";
    var selectorUnit = selector+"Unit";
    var from = Math.round(+$(selector).text() *100)/100;
    
    if(to>(max*1.1)) $(selector).addClass("red").removeClass("green gray");
    else if(to>(max*0.9)) $(selector).addClass("green").removeClass("red gray");
    else $(selector).addClass("gray").removeClass("red green");
    
    if(to<1 && to>0){
        $(selector).fadeOut(200,function(){
            $(selector).text(to);
            $(selectorUnit).text(unit);
            $(selector).fadeIn(500);
        });
    }else{
    
        jQuery({ Counter: from }).animate({ Counter: to }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $(selector).text(Math.round(this.Counter).toFixed(2));
            $(selectorUnit).text(unit);
          }
        });   
    }
}

function checkNutritionalValues(){
    animateNumbers(total.kcal,max.kcal,"#totalKcal");
    animateNumbers(total.kJ,max.kJ,"#totalkJ");
    animateNumbers(total.fats,max.fats,"#totalFats");
    animateNumbers(total.carbohydrates,max.carbohydrates,"#totalCarbohydrates");
    animateNumbers(total.sugars,max.sugars,"#totalSugars");
    animateNumbers(total.fibers,max.fibers,"#totalFibers");
    animateNumbers(total.proteins,max.proteins,"#totalProteins");
    animateNumbers(total.sodium,max.sodium,"#totalSodium");
    animateNumbers(total.cholesterol,max.cholesterol,"#totalCholesterol");
    animateNumbers(total.caffeine,max.caffeine,"#totalCaffeine");
}

function checkProductList(){
    if($("#pickedItems").find(".pickedItem").length > 0) { 
        $("#noPickedItems").hide(500); 
        $("#dietSummary").show(500);
    }
    else{
        $("#noPickedItems").show(500);
        $("#dietSummary").hide(500);
    }
}

function addProduct(product){
    product.clone().removeClass("notPickedItem").addClass("pickedItem").removeAttr('id').css("display","none").appendTo("#pickedItems").show(500);
    product.addClass("picked");

    var id = product.attr('data-id');
    pickedItems[id]=true;

    total.kcal = round(total.kcal + (+product.attr('data-kcal')));
    total.kJ = round(total.kJ + (+product.attr('data-kJ')));
    total.fats = round(total.fats + (+product.attr('data-fats')));
    total.carbohydrates = round(total.carbohydrates + (+product.attr('data-carbohydrates')));
    total.sugars = round(total.sugars + (+product.attr('data-sugars')));
    total.fibers = round(total.fibers + (+product.attr('data-fibers')));
    total.proteins = round(total.proteins + (+product.attr('data-proteins')));
    total.sodium = round(total.sodium + (+product.attr('data-sodium')));
    total.cholesterol = round(total.cholesterol + (+product.attr('data-cholesterol')));
    total.caffeine = round(total.caffeine + (+product.attr('data-caffeine')));

    Cookies.set('pickedItems', JSON.stringify(pickedItems));
    Cookies.set('totalValues', JSON.stringify(total));
    
    checkNutritionalValues();
    checkProductList();    
}

function removeProduct(product){
    var id = product.attr('data-id');
    pickedItems[id]=false; 
    total.kcal = round(total.kcal - (+product.attr('data-kcal')));
    total.kJ = round(total.kJ - (+product.attr('data-kJ')));
    total.fats = round(total.fats - (+product.attr('data-fats')));
    total.carbohydrates = round(total.carbohydrates - (+product.attr('data-carbohydrates')));
    total.sugars = round(total.sugars - (+product.attr('data-sugars')));
    total.fibers = round(total.fibers - (+product.attr('data-fibers')));
    total.proteins = round(total.proteins - (+product.attr('data-proteins')));
    total.sodium = round(total.sodium - (+product.attr('data-sodium')));
    total.cholesterol = round(total.cholesterol - (+product.attr('data-cholesterol')));
    total.caffeine = round(total.caffeine - (+product.attr('data-caffeine')));

    Cookies.set('pickedItems', JSON.stringify(pickedItems));
    Cookies.set('totalValues', JSON.stringify(total));

    id = "#item"+product.data('id');

    product.hide(500,function(){
        product.remove();
        $(id).removeClass("picked");
        checkNutritionalValues();
        checkProductList();
    });
}

function renderProducts(products, picked){
    if(jQuery.isEmptyObject(products)) return false;
    
    var returning="";
    products.forEach((item,index)=>{  
        let isPicked = "", isPickedBox = "notPickedItem", weightUnit='g';
        if(pickedItems[item._id] && !picked) isPicked = "picked";
        if(picked) isPickedBox = "pickedItem";
        if(item.drink) weightUnit = 'ml';
        
        var dataId = "id='item"+item._id+"' data-id='"+item._id+"' data-kcal='"+item.nutritionalValues.kcal+"' data-kJ='"+item.nutritionalValues.kJ+"' data-fats='"+item.nutritionalValues.fats+"' data-carbohydrates='"+item.nutritionalValues.carbohydrates+"' data-sugars='"+item.nutritionalValues.sugars+"' data-fibers='"+item.nutritionalValues.fibers+"' data-sodium='"+item.nutritionalValues.sodium+"' data-proteins='"+item.nutritionalValues.proteins+"' data-cholesterol='"+item.nutritionalValues.cholesterol+"' data-caffeine="+item.nutritionalValues.caffeine;
        var startBox = "<div class='col-md-3 "+isPickedBox+" "+isPicked+"' "+dataId+"><div class='product'>";
        var imgBox = "<img src='/img/products/"+item._id+".jpg' alt='"+item.name+"'><div class='productDescription'>";
        var detailsBox = "<p class='productName'>"+item.name+" ("+item.weight+weightUnit+")</p><p class='productData mb-2'>"+item.nutritionalValues.kcal+" kcal = "+item.nutritionalValues.kJ+" kJ</p>";
        var endBox = "</div><div class='productAdded'><span>Dodano</span></div><div class='productAdd'><span class='addIcon'><i class='icon-plus'></i></span></div><div class='productRemove'><span class='removeIcon'><i class='icon-minus'></i></span></div></div></div>";
                      
        if(item.nutritionalValues.fats>0) detailsBox=detailsBox+"<p class='productData'>"+item.nutritionalValues.fats+"g tłuszczów</p>";
        if(item.nutritionalValues.carbohydrates>0) detailsBox=detailsBox+"<p class='productData'>"+item.nutritionalValues.carbohydrates+"g węglowodanów</p>";
        if(item.nutritionalValues.sugars>0) detailsBox=detailsBox+"<p class='productData'>"+item.nutritionalValues.sugars+"g cukrów</p>";
        if(item.nutritionalValues.proteins>0) detailsBox=detailsBox+"<p class='productData'>"+item.nutritionalValues.proteins+"g białka</p>";
        if(item.nutritionalValues.cholesterol>0) detailsBox=detailsBox+"<p class='productData'>"+item.nutritionalValues.cholesterol+"g cholesterolu</p>";
        if(item.nutritionalValues.caffeine>0) detailsBox=detailsBox+"<p class='productData'>"+item.nutritionalValues.caffeine+"g koffeiny</p>";
        
        returning += startBox+imgBox+detailsBox+endBox;
    });
    
    return returning;
}


socket.on('userNumber', (num)=>{
    $("#userNumber").text(num);
});

socket.on('found', (products)=>{
    $("#notPickedItems").empty();
    var notPickedItems = renderProducts(products,false);
    
    if(!notPickedItems)
        $("#notPickedItems").append("<div class='col-12'><h2>Brak szukanych produktów</h2></div>");
    else
        $("#notPickedItems").append(notPickedItems);
});

socket.on('rendered', (allProducts, pickedProducts)=>{
    $("#notPickedItems").hide().empty();
    $("#pickedItems").hide();
    
    var notPickedItems = renderProducts(allProducts,false);
    var pickedItems = renderProducts(pickedProducts,true);
    
    if(notPickedItems)
        $("#notPickedItems").append(notPickedItems);
    
    if(pickedItems)
        $("#pickedItems").append(pickedItems);
    
    $('#loader').fadeOut(300);
    checkProductList();
    $("#notPickedItems").fadeIn(800);
    $("#pickedItems").fadeIn(600);
    checkNutritionalValues();
});

$(document).ready(()=>{
    var filtered = Object.keys(pickedItems).filter(function(key){
        return pickedItems[key];
    });
    socket.emit('renderItems', filtered);
});

$(document).on('click','.notPickedItem',function(){
    addProduct($(this));
});

$(document).on('click','.pickedItem',function(){
    removeProduct($(this));
});

$(document).on('click','#submitForm',function(){
    var name = $("#name").val();
    var age = $("#age").val();
    var height = $("#height").val();
    var weight = $("#weight").val();
    var activity = $("#activity option:selected" ).val();
    var gender = $('input[name=gender]:checked').val();
    var letter = /^[\s\p{L}]+$/u;
    var number = /^\d+$/;
    var error = false;
    var user = {};
    
    $("#errorBox").hide();
    $("#errorBox").empty();
    if(!name || !name.match(letter)) {$("#errorBox").append("<p>Imię jest niepoprawne</p>"); error=true};
    if(!age || !age.match(number)) {$("#errorBox").append("<p>Wiek jest niepoprawny</p>"); error=true};
    if(!height || !height.match(number)) {$("#errorBox").append("<p>Wzrost jest niepoprawny</p>"); error=true};
    if(!weight || !weight.match(number)) {$("#errorBox").append("<p>Waga jest niepoprawna</p>"); error=true};
    if(!activity || (activity!=0 && activity!=1 && activity!=2 && activity!=3 && activity!=4 )) {$("#errorBox").append("<p>Rodzaj aktywności jest niepoprawny</p>"); error=true};
    if(!gender || (gender!="men" && gender!="women")) {$("#errorBox").append("<p>Płeć jest niepoprawna</p>"); error=true};
    
    $("#errorBox").fadeIn();
    
    if(!error){
        user.name = name;
        user.age = age;
        user.height = height;
        user.weight = weight;
        user.activity = waf[activity];
        user.gender = gender;
 
        if(gender=="men"){
            max.kcal = (66.47 + (13.7*weight) + (5.0*height) + (-6.76*age))*user.activity;
        }
        else{
            max.kcal = (655.1 + (9.567*weight) + (1.85*height) + (-4.68*age))*user.activity;
        }
        
        max.kJ = max.kcal*4.184;
        max.fats = (max.kcal*max.fats)/2000;
        max.carbohydrates = (max.kcal*max.carbohydrates)/2000;
        max.sugars = (max.kcal*max.sugars)/2000;
        max.fibers = (max.kcal*max.fibers)/2000;
        max.proteins = (max.kcal*max.proteins)/2000;
        
        Cookies.set('user', JSON.stringify(user));
        Cookies.set('max', JSON.stringify(max));
        window.location.href = "/kalkulator";
    }
});

$('#searcher').on('input', ()=> {
    var text = $('#searcher').val();
    socket.emit('search',text);
});