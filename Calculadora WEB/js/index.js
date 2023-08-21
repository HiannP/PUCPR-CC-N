function somar() {
	var va1 = parseFloat(document.getElementById("valor1").value);
	var va2 = parseFloat(document.getElementById("valor2").value);
	
	var soma = va1 + va2;
	
	document.getElementById("resultado1_2").value = soma;

}

function subtr() {
	var va3 = parseFloat(document.getElementById("valor3").value);
	var va4 = parseFloat(document.getElementById("valor4").value);

	var subt = va3 - va4;

	document.getElementById("resultado3_4").value = subt;
}

function multi() {
	var va5 = parseFloat(document.getElementById("valor5").value);
	var va6 = parseFloat(document.getElementById("valor6").value);

	var mult = va5 * va6;

	document.getElementById("resultado5_6").value = mult;
}

function divid() {
	var va7 = parseFloat(document.getElementById("valor7").value);
	var va8 = parseFloat(document.getElementById("valor8").value);

	var divi = va7 / va8;

	document.getElementById("resultado7_8").value = divi;
}

function limpar() {
	window.location.reload()
}