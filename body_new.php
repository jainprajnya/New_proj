<div class="opaque">

</div>
<div class="content">
        <div class="blog">

            <div class="blog-header">
                <div class="container">
                    <div id='left_pannel'>
                    </div>

                    
                    <div class="no-padding col-md-1 col-sm-1 col-xs-1">
                        <a class="rss-icon hidden" href="http://rss.com" target="_blank"><span>Rss</span></a>
                    </div>
                </div>
            </div>
            <div class="container">
                <div id="body_table">
                        <div  id="dummy_row">
                        </div>
                        <div id="timeline_btn">            
                            <button id="daily" class="timeline" style="background-color: #6db3f2;">daily</button>
                            <button id="weekly" class="timeline" >weekly</button>
                            <button id="monthly" class="timeline">monthly</button>          
                            <div id="period"></div>
                            <div><?php include('basic_filters.php');?></div>
                        </div>            
                        
                    
                    <div id="data" >
                        <div id="container_graph_child" name="level_identify_div" style="display:hidden;"></div>
                        <div id="container" ></div>
                        <div id="summary"><table id="summay_table">
                        </table></div>
                    </div>

                </div>
            </div>

            <a class="show-more fancy-font" href="#">
                Show more
            </a>

            <div class="container">                
                <div class="back-to-top-container">
                    <a style="display: none !important;" href="#top" class="back-to-top fancy-font"><span>Back to top</span></a>
                </div>
            </div>

        </div>
    </div>