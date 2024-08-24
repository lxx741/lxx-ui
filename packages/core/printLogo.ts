export default function () {
  if (PROD) {
    const logo = `
______________________________________

#       #     # #     #    #     # ### 
#        #   #   #   #     #     #  #  
#         # #     # #      #     #  #  
#          #       #       #     #  #  
#         # #     # #      #     #  #  
#        #   #   #   #     #     #  #  
####### #     # #     #     #####  ### 
______________________________________
             author:Lxx
`

    console.info(logo)
  } else if (DEV) {
    console.log('[LxxUI]:dev mode...')
  }
}
