import "./Hero.css";
import { FigletBanner } from "./FigletBanner";

const mooseArt = `
                                                                     ###.                 
                                                                  ##     ##               
                                                                 #    #+-..##             
                                                                #    #----...#            
                                                               -# .  +------..#           
                                                               #  .  +-------. #          
                                                               # ... #-------- #          
                                                               # ... -+------- ##         
                                             -#########.       .  ..  +-------.+#         
                                     ############################ ...  +------ ##         
                                 ######+++##############++###++-#   .  ------- #          
                             ####-  .-++++-...........-+### . ####  ..  +----. #          
                          +##+. -#####+--#####+--------..--  + ###     .+---. #           
                        ###...+##-           .###--------+#  #      +#+-.    ##           
                      ##-..--##.                #+-----+##.    .##+.     ######           
                     ##..---##             ##    #+---.#   ---.....+######+++-###         
                   ##..-----#              #-  -  #---.#.-.+#########-....###++-###       
                  ##..------#                  -  .+----+#++-..---...-----..##++--##      
   ######    ####  -.-------#                 ... .+------------------------..##++-##     
 ##   . .# ##     #+--------#                 -.  #+--------------------------.##++-##    
 #   #--.+#      ##---------##              .-.   #----------------------------.+#++-##   
 -   #--.#       #+----------##           -+..   #------------------------------.#++--#   
     #-..#       #-----------+##-      -+-.    ##+------------------------------.-#++-##  
 . . .#+## ##    #--------#+.--+####        ###+---------------------------------.#+++.#  
 # .     #       #--...---###-----+#########+------------------------------------.#+++.#  
 #        #      #+-+#####+..-----------------------------------------------------#+++.#  
  ##.     -##     #-..#   #-----------------------------------------------------.#++++.#  
    #######  #### #..-#+  #----------------------------------------------------.-#+++-##  
                  ##..+####---------------------------------------------------.-#+++-##   
                   ##-.------.................-..---------------------------..##+++-##    
                     ##.....+#################+.#+---##..................+#-+##++-+##     
                      ##+-###+++++++++++++++++##......-################### ##. #+##.      
                        ###+--++++++++++++++++++#+##...#++++++++++++++++##-#++ ###        
                           ###+-++++++++++++++++++####++++++++++++++++++++--####          
                             .###---++++++++++++++++++++++++++++++++++-.-####             
                             #  +#####+..--+++++++++++++++++++++--.-######                
                             #####   ############+------++#+++##+####                     
                                             -###############  .##                        
                                                             ###-                                                                        
`;

function Hero() {
    return (
        <div className="ascii-hero">
            <div className="hero-text">
                <FigletBanner text="Alejandro Bernal Cruz" font="Slant" />

                <div className="hero-roles">
                    <div className="role">Project Manager</div>
                    <div className="role">Software Engineer</div>
                    <div className="role">Full-Stack Developer</div>
                </div>
            </div>

            {/* Fastfetch mock - moose as the "logo" on the left, system info on the right */}
            <div className="fastfetch">
                <pre className="ascii-moose" aria-hidden="true">
                    {mooseArt}
                </pre>

                <div className="fastfetch-info">
                    <div className="fastfetch-line">
                        <span className="label">OS</span>
                        <span className="separator">:</span>
                        <span className="value">moosey OS 23.96.0</span>
                    </div>

                    <div className="fastfetch-line">
                        <span className="label">Host</span>
                        <span className="separator">:</span>
                        <span className="value">
                            alejandro-bernal@portfolio
                        </span>
                    </div>

                    <div className="fastfetch-line">
                        <span className="label">Shell</span>
                        <span className="separator">:</span>
                        <span className="value">zsh 5.9</span>
                    </div>

                    <div className="fastfetch-line">
                        <span className="label">Theme</span>
                        <span className="separator">:</span>
                        <span className="value">linux-terminal</span>
                    </div>

                    <div className="fastfetch-commands">
                        <div className="commands-header">
                            Available commands:
                        </div>
                        <div className="command-list">
                            <span>help</span>
                            <span>about</span>
                            <span>projects</span>
                            <span>skills</span>
                            <span>contact</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
