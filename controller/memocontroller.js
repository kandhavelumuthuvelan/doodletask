const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Memo = mongoose.model('Memo');
var moment = require('moment');
router.get('/',(req, res) => {
    res.render("memoaddedit", {
    viewTitle: "Insert a New Memo"
    });
    });

router.post('/', (req,res) => {
    console.log("req.body._id",req.body._id)
    
        if (req.body._id == '')
        {
     //   console.log("req.body._id",req.body)
        insertIntoMongoDB(req, res);
         }
          else
          {
       // console.log("req.body._id",req.body)
        updateIntoMongoDB(req, res);
          }
        });

    function insertIntoMongoDB(req,res)
    {
        var memo=new Memo();
        memo.taskName=req.body.taskName;
        memo.expiry=req.body.expiry;
        memo.status=req.body.status;
        memo.memoId=req.body.memoId;
        memo.save((err,doc)=>{
            if(!err)
            res.redirect('memo/list');
            else
            console.log('Error during record insertion : ' + err);
        })
    }    
    function updateIntoMongoDB(req,res)
    {
        console.log(req.body);
        Memo.findOneAndUpdate({_id:req.body._id},req.body,{ new: true,upsert: true },(err,doc)=>{
            if (!err) { res.redirect('memo/list'); }
            else{
                if(err.name == 'ValidationError')
                {
                    handleValidationError(err,req.body);
                    res.render("memoaddedit", {
                        //Retaining value to be displayed in the child view
                        viewTitle: 'Update Course Details',
                        employee: req.body
                        });
                }
                else
                console.log('Error during updating the record: ' + err);
            }

        });   
    }

    router.get('/list', (req,res) => {
        Memo.find((err, docs) => {
        if(!err){
            const context = {
                usersDocuments: docs.map(docs => {
                  return {
                    taskName: docs.taskName,
                    courseName: docs.courseName,
                    created_at: docs.created_at,
                    updated_at: docs.updated_at,
                    status: docs.status,
                    expiry: docs.expiry,
                    memoId:docs.memoId,
                    _id:docs._id
                    
                  }
                })
              }
        res.render("list", {
        list: context.usersDocuments
        });
        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        });
        });

    function handleValidationError(err,body)
    {
        for(feild in err.errors)
        {
            switch(err.errors[field].path)
            {
                case "taskname":
                body['taskNameError']= err.errors[field].message;
                break;
                default:
                break
            }
        }
    }


    router.get('/list', (req,res) => {
        Memo.find((err, docs) => {
        if(!err){
            res.redirect('/')
            console.log('List: '+ docs);   
        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        });
        });



router.get('/:id', (req, res) => {
    Memo.findById(req.params.id, (err, docs) => {
    if (!err) {
        const context = {
                taskName: docs.taskName,
                courseName: docs.courseName,
                created_at: docs.created_at,
                updated_at: docs.updated_at,
                status: docs.status,
                expiry: docs.expiry,
                memoId:docs.memoId,
                _id:docs._id
              }
        
          
    res.render("memoaddedit", {
    viewTitle: "Update Course Details",
    memo: docs
    });
    }
    });
    });

 router.get('/delete/:id',(req,res)=>{
     Memo.findByIdAndRemove(req.params.id,(err,doc)=>{
     if(!err)
     {
        res.redirect('/memo/list');
     }
     else
     {
          console.log('Failed to Delete Course Details: ' + err); 
    }
});
});

module.exports = router;