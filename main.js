let count = document.querySelector('.count span')
let questionArea = document.querySelector('.question')
let bullet = document.querySelector(".bulletsarea ul")
let sumbitbtn = document.querySelector('.sumbitbtn')
let answer = document.querySelector('.question .answer')
let res =document.querySelector('.res')
let resspan =document.querySelector('.res span')
let timecount = document.querySelector('.timecount')
let start = document.querySelector('.start')
let qcount = 0;
currentindex=0
right = 0
let coundown


function callAjax (){
let request = new XMLHttpRequest()

request.onreadystatechange =function (){
    if(request.status ===200 && request.readyState===4){
        let question = JSON.parse(request.response)
        let qnum = question.length
        
       getbullet(qnum)
       getQuestion(question[currentindex],qnum)
       setTim(3,qnum)
sumbitbtn.addEventListener('click',()=>{
    checkCorrect(question,qnum)
    handellbullet()
    currentindex++

    questionArea.innerHTML = ""
    answer.innerHTML =""
    clearInterval(coundown)
    setTim(3,qnum)
    getQuestion(question[currentindex],qnum)
    finalres(qnum)
    
})

    }
}
request.open("Get","app.json",true)
request.send()
sumbitbtn.classList.remove('active')
}
//callAjax()
start.addEventListener(('click'),()=>{
    callAjax()
})

function getbullet(num){
    count.innerHTML = num
    for(let i=0;i<num;i++){
        let li = document.createElement('li')
       
        bullet.appendChild(li)
        if(i==0){
            li.className = 'on'
        }
    }
}
function getQuestion(q,coun){


    if(currentindex<coun){
        let h2= document.createElement('h2')
        h2.appendChild(document.createTextNode(currentindex+1+"-"+q.title))
        questionArea.appendChild(h2)
        
        for(let i=1;i<=4;i++){
            let ans = document.createElement('div')
            ans.className = "ans"
            let input = document.createElement('input')
            input.id = `answer_${i}`
            input.type = "radio"
            input.name = 'answer'
            input.dataset.answer = q[`answer_${i}`]
            ans.appendChild(input)
            let label = document.createElement("label")
            label.setAttribute('for',`answer_${i}`)
            
            label.appendChild(document.createTextNode(q[`answer_${i}`]))
            ans.appendChild(label)
            answer.appendChild(ans)
        }
       
        questionArea.appendChild(answer)
        
    }
   
}
function handellbullet(){
  let bull=  Array.from(document.querySelectorAll("ul li"))
  bull.forEach((b,i)=>{
    if(currentindex == i){
        b.className = "on"
    }
  })

}

function checkCorrect(check,c){
  let correctans = check[currentindex ].right_answer
  let ans = document.querySelectorAll('.ans')
  let ch = document.querySelector('input[name=answer]:checked').dataset
 if(ch.answer == correctans)
    {
        right++
        
    }
   
}
function finalres (c){
    
    if(currentindex == c){
let resul = document.createElement('span')
res.appendChild(resul)
resul.appendChild(document.createTextNode(`you answer ${right} from ${c}`))
if(right == c){
resspan.classList.add('perfect')
resspan.innerHTML = "perfect"
}
else if(right >=c/2 && right < c){
    resspan.classList.add('good')
    resspan.innerHTML = "good"
}
else{
    resspan.classList.add('bad')
    resspan.innerHTML = "bad"
}
    }
   
}


function setTim (x,q){
 coundown = setInterval(()=>{
    if(currentindex < q){
        let min = parseInt(x/60)
        let sec = parseInt(x%60)
      min =  min < 10 ? `0${min}`:`${min}`
       sec = sec < 10 ? `0${sec}`:`${sec}`
        timecount.innerHTML = `${min} : ${sec}`
        if(--x < 0){
            clearInterval(coundown)
            sumbitbtn.click();
        }
    }

},1000)
}



