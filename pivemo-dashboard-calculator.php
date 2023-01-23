<?php
/**
 * Plugin Name:  Pivemo Dashboard Calculator
 * Description:  A simple calculator for the dashboard.
 * Author:       Pivemo AB
 * Author URI:   https://pivemo.se
 * Version:      1.0
 */

 if ( ! defined('ABSPATH') ) {
    die("Access denied!");
 }

 // Enqueue scripts and localize variables
add_action( 'admin_enqueue_scripts', 'pi_enqueue_calculator_script' );

function pi_enqueue_calculator_script() {
    wp_enqueue_script( 'pi_dashboard_calculator_script', plugin_dir_url( __FILE__ ) . '/js/calculatorApp.js', [], '1.0' );
    wp_enqueue_style('pi_dashboard_calculator_style', plugin_dir_url( __FILE__ ) . '/style/calculatorStyle.css', [], "1.0");
}

 // Set up Widget 
add_action('wp_dashboard_setup', 'pi_dashboard_calculator_widget');

function pi_dashboard_calculator_widget() {
    wp_add_dashboard_widget(
        'pi_dashboard_calculator_widget',
        'Pivemo Dashboard Calculator',
        'pi_dashboard_calculator_callback'
    );
}

// Create callback and HTML for Widget
function pi_dashboard_calculator_callback() {
    echo pi_dashboard_calculator_HTML();
}

function pi_dashboard_calculator_HTML() {
?>
<div class="pi_calculator_container">
    <div class="pi_calculator">
        <div class="calculator-display"><p data-prev-op class="calculator-prev-numbers"></p><p data-display class="calculator-display-numbers"></p></div>
        <button class="calculator-button calculator-ac" data-clear>ac</button>
        <button class="calculator-button calculator-del" data-del>del</button>
        <button class="calculator-button calculator-button-yellow" data-method>÷</button>
        <button class="calculator-button" data-number>7</button>
        <button class="calculator-button" data-number>8</button>
        <button class="calculator-button" data-number>9</button>
        <button class="calculator-button calculator-button-yellow" data-method>*</button>
        <button class="calculator-button" data-number>4</button>
        <button class="calculator-button" data-number>5</button>
        <button class="calculator-button" data-number>6</button>
        <button class="calculator-button calculator-button-yellow" data-method>-</button>
        <button class="calculator-button" data-number>1</button>
        <button class="calculator-button" data-number>2</button>
        <button class="calculator-button" data-number>3</button>
        <button class="calculator-button calculator-button-yellow" data-method>+</button>
        <button class="calculator-button calculator-0 " data-number>0</button>
        <button class="calculator-button" data-number>.</button>
        <button class="calculator-button calculator-button-yellow" data-equals>=</button>
    </div>
</div>
<?php
}