<?php

/**
 * The template for displaying the map pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package connectingashley
 * 
 * Template Name: Map
 */

get_header(); ?>

<main id="main" class="main main--map">
    <div class="toolbar">
        <h1 class="map-filters__title">Connecting <span>Ashley</span></h1>
        <div id="map-filters" class="map-filters"></div>

    </div>

    <div id="map" class="map"></div>
    
    <div id="filter-panel" class="filter-panel">
        <div id="sheet-header" class="sheet-header"></div>
        <div class="sheet-content" id="sheet-filters">
            <div id="filter-categories" class="filter-panel__categories"></div>
        </div>
    </div>

</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>