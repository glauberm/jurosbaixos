var data = {};

jQuery( document ).ready( function() {
    data["action"] = "get_results";

    ajaxPost( data );
});

function ajaxPost( data ) {
    return jQuery.ajax({
        type: "POST",
        url: ajax_object.ajaxurl,
        data: data,
        success: function( response ) {
            // Cria o objeto
            var objs = jQuery.parseJSON(response);

            // Destrói a tabela já construída
            if ( jQuery("#main__table_thead").children().length > 0 &&
            jQuery("#main__table_tbody").children().length > 0 ) {
                jQuery( "#main__table_thead" ).empty();
                jQuery( "#main__table_tbody" ).empty();
            }

            // Constrói a tabela
            for( var i = 0; i < objs.length; i++ ) {
                if( i === 0 ) {
                    buildThead(objs[0]);
                }

                buildTbody(objs, i);
            }
        },
        complete: function() {
            jQuery( "#main__table_thead .filter" ).on('click', function() {
                var id = jQuery(this).parent().attr("id");

                // Cria o array order caso não exista
                if( data["order"] === undefined ) {
                    data["order"] = {};
                }

                // Adiciona a ordem
                if(data["order"][id] === "asc" ) {
                    data["order"][id] = "desc";
                } else {
                    data["order"][id] = "asc";
                }

                ajaxPost(data);
            });
        }
    })
    .done( function() {
        for(order in data["order"]) {
            jQuery( "#"+order ).addClass(data["order"][order]);
        }
    })
    ;
}

function buildThead( obj ) {
    var theadHtml = "<tr>";

    for( var attr in obj ) {
        var name = attr;
        var help = null;

        switch(attr) {
            case 'marca':
                name = "Marca";
            break;
            case 'modelo':
                name = "Modelo";
            break;
            case 'aluguel':
                name = "Aluguel";
            break;
            case 'preco':
                name = "Preço";
            break;
            case 'maxparcelapreco':
                name = "Nº max. de parcelas";
                help = "Máximo de vezes em que você pode parcelar a compra da máquina.";
            break;
            case 'celular':
                name = "Conexão c/ cel.";
                help = "Se é necessário conectar a máquina no celular ou não.";
            break;
            case 'taxadebito':
                name = "Taxa de débito";
                help = "Taxa cobrada por venda no débito."
            break;
            case 'taxacredito1dia':
                name = "Taxa de crédito p/ 1 dia";
                help = "Taxa cobrada por venda no crédito para receber no dia seguinte."
            break;
            case 'taxacredito30dias':
                name = "Taxa de crédito p/ 30 dias";
                help = "Taxa cobrada por venda no crédito para receber em 30 dias."
            break;
            case 'site':
                name = "Site";
            break;
        }

        theadHtml += "<th id='" + attr + "'>";

        if( help === null) {
            theadHtml += "<span>" + name + "</span>";
        } else {
            theadHtml += "<span class='help-span' title='" + help + "'>" + name;
            theadHtml += "<div class='help'>?</div></span>";
        }

        theadHtml += "<div class='filter'></div></th>";
    }

    theadHtml += "</tr>";

    jQuery( "#main__table_thead" ).append( theadHtml );
}

function buildTbody( objs, i ) {
    var tbodyHtml = "<tr>";

    for( var attr in objs[i] ) {
        var name = objs[i][attr];

        switch(attr) {
            case 'marca':
            case 'modelo':
            break;
            case 'aluguel':
                if( objs[i][attr] == 0) {
                    name = "Gratuito";
                } else {
                    name = "R$ " + parseFloat(objs[i][attr].replace(/,/g, ".")).toFixed(2);
                }
            break;
            case 'preco':
                if( objs[i][attr] == 0) {
                    name = "Gratuito";
                } else {
                    name = "R$ " + parseFloat(objs[i][attr].replace(/,/g, ".")).toFixed(2);
                }
            break;
            case 'maxparcelapreco':
                name = objs[i][attr] + "x";
            break;
            case 'celular':
                if( objs[i][attr] == 0) {
                    name = "Necessária";
                } else {
                    name = "Não necessária";
                }
            break;
            case 'taxadebito':
                name = parseFloat(objs[i][attr].replace(/,/g, ".")).toFixed(2) + "%";
            break;
            case 'taxacredito1dia':
                name = parseFloat(objs[i][attr].replace(/,/g, ".")).toFixed(2) + "%";
            break;
            case 'taxacredito30dias':
                if( objs[i][attr] == '–') {
                    name = "Indisponível";
                } else {
                    name = parseFloat(objs[i][attr].replace(/,/g, ".")).toFixed(2) + "%";
                }
            break;
            case 'site':
                name = "<a href='" + objs[i][attr] + "' target='_blank'>Visitar site</a>";
            break;
        }

        tbodyHtml += "<td>" + name + "</td>";
    }

    tbodyHtml += "</tr>";

    jQuery( "#main__table_tbody" ).append( tbodyHtml );
}
