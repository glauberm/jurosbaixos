<?php
/*
Plugin Name: Máquinas de Cartão
Description: Apresenta uma tabela dinâmica comparativa entre diferentes máquinas de cartão de crédito.
Author: Glauber Mota
Version: 1.0
Author URI: https://github.com/glauberm
*/

// Proíbe acesso direto
defined( 'ABSPATH' ) || die( 'Acesso direto não permitido!' );

// Define o caminho do plugin como constante
define( 'MAQUINAS_CARTAO_ABSPATH', plugin_dir_path( __FILE__ ) );
define( 'MAQUINAS_CARTAO_URI', plugins_url( 'maquinas-cartao' ) );

// Carrega a classe principal
require_once MAQUINAS_CARTAO_ABSPATH . 'classes/class-maquinas-cartao.php';

add_action( 'init', array( 'Maquinas_Cartao', 'init' ) );
