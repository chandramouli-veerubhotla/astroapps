function jd(d,m,y){var a,j,l;var b;if(m<3){m+=12;y--}
a=y/100;b=parseFloat(30.6)*parseFloat(m+1);l=parseInt(b);j=365*y+y/4+l+2-a+a/4+d;return j}
function calculateB6(d,m,y){var h,mt,s,h6,b6,timeZone;h=12;mt=0;s=0;timeZone=5.5;h6=(h+mt/60+s/3600-(12+timeZone))/24;b6=(jd(d,m,y)-694025+h6)/36525;return b6}
function ramanAyan(dd,mm,yy){return 21.013972+1.398191*calculateB6(dd,mm,yy)}
function lahiriAyan(dd,mm,yy){return 22.460148+1.396042*calculateB6(dd,mm,yy)+3.08E-4*calculateB6(dd,mm,yy)*calculateB6(dd,mm,yy)}
function kpayanold(dd,mm,yy){return(yy+(mm*30+dd)/365-297.3204723)*50.2388475/3600}
function kpayannew(dd,mm,yy){var newAya,kpayaOn1stJan,daysAfter1stJan,correctionForDays;kpayaOn1stJan=22+(1335+(yy-1900)*50.2388475)/3600+(yy-1900)*(yy-1900)*1.11E-4/3600;daysAfter1stJan=((mm-1)*30+(dd-1))/3600;correctionForDays=daysAfter1stJan/365*(50.2388475+1.11E-4*20);newAya=kpayaOn1stJan+correctionForDays;return newAya}
function kpayankhu(dd,mm,yy){var dayAya,newAya,totalday;dayAya=50.2388475/365.25;totalday=(yy-291)*365.25;totalday+=mm*30+dd-114;newAya=dayAya*totalday;newAya/=3600;return newAya}
function dms(x){var parts="";var temp;var negative;if(x<0){negative=true;x=x*(-1);}
var deg,min,sec;deg=parseInt(x);parts=parts+deg+":";temp=x-parseFloat(parseInt(x));min=parseInt(temp*60);parts=parts+min+":";temp=temp*60;temp=temp-parseFloat(parseInt(temp));sec=parseInt(temp*60+0.5);parts=parts+sec;if(negative==true)
parts="-"+parts;return parts};


function init(){var dateObj=new Date();document.getElementById('day').value=dateObj.getDate();document.getElementById('month').value=dateObj.getMonth()+parseInt("1");document.getElementById('year').value=dateObj.getFullYear();calculate();}
function calculate(){var d=parseInt(document.getElementById('day').value);var m=parseInt(document.getElementById('month').value);var y=parseInt(document.getElementById('year').value);var RamanAyan,LahiriAyan,KPAyanOld,KPAyanNew,KPAyankhu;var ayanNames=new Array("Lahiri","KP Old","KP New","Raman","Khullar");var divNames=new Array("Lahiri","KPayanOld","KPayanNew","Raman","KPayankhu");var ayanFunctions=new Array(5);ayanFunctions[0]=lahiriAyan;ayanFunctions[1]=kpayanold;ayanFunctions[2]=kpayannew;ayanFunctions[3]=ramanAyan;ayanFunctions[4]=kpayankhu;var ayans=new Array(5);for(var i=0;i<5;i++){ayans[i]=ayanFunctions[i](d,m,y);document.getElementById(divNames[i]).innerHTML=dms(ayans[i]);}
var myDiv;myDiv=document.getElementById('myDiv');var abc="<table border='0' align='center' width='90%'  cellspacing='0' cellpadding='0'class='ayandifftable' >";var abc=abc+"<tr><td style='background-color:#FBDE81;border: 2px#fff solid;'>&nbsp;</td>";for(var i=0;i<5;i++){var abc=abc+"<td class='ayanheading'>"+ayanNames[i]+"</td>";}
for(var i=0;i<5;i++){abc=abc+"<tr><td class='ayanheading'>"+ayanNames[i]+"</td>";for(var j=0;j<5;j++){abc=abc+"<td class='ayancontent'>"+dms(ayans[i]-ayans[j])+"</td>";}
abc=abc+"</tr>";}
abc=abc+"</table>";myDiv.innerHTML=abc;}
function resetfrm(){document.getElementById('day').value="";document.getElementById('month').value="";document.getElementById('year').value="";document.getElementById('day').focus();}
function submitfrm(){if(document.getElementById('day').value==""||document.getElementById('month').value==""||document.getElementById('year').value==""){alert("Plesae Enter Date(DD/MM/YYYY)");document.getElementById('day').focus();}
else{calculate();}}