export default class FlipBookTemplate {
  
    public static templateHtml: string =  `<!-- begin flipbook  -->
    <div id="fb5-ajax" data-cat="your_book_name" data-template="true"> 			
      
      <!-- BEGIN PRELOADER -->
        <div class="fb5-preloader"></div>
        <!-- END PRELOADER -->
            
        <!-- BEGIN STRUCTURE HTML FLIPBOOK -->      
        <div class="fb5" id="fb5">      
            
            <!-- CONFIGURATION BOOK -->
            <section id="config">
              <ul>
               <li key="page_width">2481</li>               <!-- width for page -->
                <li key="page_height">1749</li>             <!-- height for page -->
                <li key="gotopage_width">25</li>            <!-- width for field input goto page -->
                <li key="zoom_double_click">1</li>          <!-- value zoom after double click -->
                <li key="zoom_step">0.06</li>				<!-- zoom step ( if click icon zoomIn or zoomOut -->
                <li key="toolbar_visible">false</li>			<!-- enabled/disabled toolbar -->
                <li key="tooltip_visible">false</li>			<!-- enabled/disabled tooltip for icon -->
                <li key="deeplinking_enabled">false</li>   	<!-- enabled/disabled deeplinking -->  
                <li key="lazy_loading_pages">false</li>		<!-- enabled/disabled lazy loading for pages in flipbook -->
                <li key="lazy_loading_thumbs">false</li>	<!-- enabled/disabled lazdy loading for thumbs -->
                <li key="double_click_enabled">true</li> 	<!-- enabled/disabled double click mouse for flipbook -->                 
                <li key="rtl">false</li>					<!-- enabled/disabled 'right to left' for eastern countries -->
                <li key="pdf_url">https://dongenergydt.sharepoint.com/sites/Radius/Shared%20Documents/PDPA.pdf</li>		    <!-- pathway to a pdf file ( the file will be read live ) -->
                <li key="pdf_scale">1</li>					<!-- to live a pdf file (if you want to have a strong zoom - increase the value) -->
                <li key="page_mode">double</li>             <!-- value to 'single', 'double', or 'auto' -->
                <li key="sound_sheet"></li>                 <!-- sound for sheet -->
          <li key="logo_url">img/logo.png</li>        <!-- logo url -->
          <li key="icon_color">#6B2200</li>           <!-- icon color -->
             </ul> 
            </section>
                                             
          
            <!-- BEGIN CONTAINER BOOK -->
            <div id="fb5-container-book">
         
                <!-- BEGIN deep linking -->  
                <section id="fb5-deeplinking">
                  <ul>
                  </ul>
                </section>
                <!-- END deep linking -->  
                    
                <!-- BEGIN ABOUT -->
                <section id="fb5-about">
                </section>
                <!-- END ABOUT -->
                
                
                <!-- BEGIN LINKS -->
                <section id="links">
                </section>     
                <!-- END LINKS -->                         
                                          
        
                <!-- BEGIN PAGES -->
                <div id="fb5-book">                       
                </div>
                <!-- END PAGES -->
                
            </div>
            <!-- END CONTAINER BOOK -->
        
        </div>
        <!-- END STRUCTURE HTML FLIPBOOK -->
    
         
    </div>
    <!-- end flipbook -->`;
}

