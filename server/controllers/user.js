export const register = async(req,res) =>{
         try {
            
            res.send("register api")
         } catch (error) {
            res.status(500).json({
                message : error.message,
            })
         }
}