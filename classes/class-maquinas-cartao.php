<?php

// Proíbe acesso direto
defined('ABSPATH') || die('Acesso direto não permitido!');

class Maquinas_Cartao
{
    public static function init() {
        // Carrega os scripts necessários
        add_action( 'wp_enqueue_scripts', array( 'Maquinas_Cartao', 'ajax_enqueue' ) );

        // Adiciona o método às ações do ajax do WordPress
        add_action('wp_ajax_get_results', array( 'Maquinas_Cartao', 'get_results' ) );
        add_action('wp_ajax_nopriv_get_results', array( 'Maquinas_Cartao', 'get_results' ) );

        // Adiciona o shortcode
        add_shortcode( 'maquinas-cartao-render', array( 'Maquinas_Cartao', 'render' ) );

    }

    public static function ajax_enqueue()  {
        // Carrega o meu ajax com dependências
        wp_enqueue_script( 'maquinas-cartao-ajax',
            MAQUINAS_CARTAO_URI .'/assets/js/ajax.js',
            array( 'jquery' ), null, true)
        ;

        // Carrega o AJAX do WordPress
        wp_localize_script( 'maquinas-cartao-ajax', 'ajax_object', array(
            'ajaxurl' => admin_url( 'admin-ajax.php' )
        ));
    }

    public static function get_results() {
        global $wpdb;

        $columnNames = array(
            'marca',
            'modelo',
            'aluguel',
            'preco',
            'maxparcelapreco',
            'celular',
            'taxadebito',
            'taxacredito1dia',
            'taxacredito30dias',
            'site'
        );

        $query = 'SELECT '. implode($columnNames, ', ') .' FROM Dados';

        // Adiciona os filtros
        if( !empty( $_POST['order'] ) ) {
            $query .= ' ORDER BY ';

            $arrayOrder = [];
            $i = 0;
            foreach($_POST['order'] as $key => $value) {
                $arrayOrder[$i] = $key;

                if( $value === 'asc' ) {
                    $arrayOrder[$i] .= ' ASC';
                } else {
                    $arrayOrder[$i] .= ' DESC';
                }

                $i++;
            }

            $query .= implode($arrayOrder, ', ');
        }

        // Pega os dados do banco
        $results = $wpdb->get_results( $query );

        echo json_encode($results);

    	wp_die();
    }

    public static function render() {
        require_once MAQUINAS_CARTAO_ABSPATH . 'views/view-table.php';
    }
}
