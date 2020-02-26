$(document).ready(function(){
	$(".p2019").click(function(){
		let pessoas = 23800;
		let soma_notas = 149217.44199999867;
		let media = ((soma_notas) / pessoas);
		media = Math.round((media + Number.EPSILON) * 1000) / 1000;
		$('.resultado').val(media);
	});
});