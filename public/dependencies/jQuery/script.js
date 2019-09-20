$(document).ready(function () {
    jQuery.get('http://localhost:3000/collections', function(data) {
        let id 
        = Number(localStorage.getItem('id') );
        // console.log('"'+data[0].imageUrl+'"');
        for (let i = 0; i < data.length; i++) {
            let src = data[i].imageUrl;;


            $('.indexGallery').append(`<div class="col-md-4">
                <div class="thumbnail">
                <a href="#">
                    <img src="./dependencies/img/galleryImg/${src}" alt="Fjords" style="width:100%">
                    <div class="caption">
                    <p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>
                    </div>
                </a>
                </div>
            </div>`);

            // console.log(data[i], id);
            if(Number(data[i].designerId) === id) {
                $('.collectionsGallery').append(`<div class="col-md-4">
                    <div class="thumbnail">
                        <a href="#">
                            <img src="./dependencies/img/galleryImg/${src}" alt="Lights" style="width:100%">
                            <div class="caption">
                                <button data-toggle="modal" data-target="#editModal" id="colEdit" type="button" class="btn btn-primary">EDIT</button>
                                <button data-toggle="modal" data-target="#deleteModal" id="colDelete"  type="button" class="btn btn-danger">DELETE</button>
                            </div>
                        </a>
                    </div>
                </div>`);
            } else {
                $('.profileGallery').append(`<div class="col-md-4">
                    <div class="thumbnail">
                        <a href="${src}">
                            <img src="./dependencies/img/galleryImg/${src}" alt="Fjords" style="width:100%">
                                <div class="caption">
                            <p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>
                            </div>
                        </a>
                    </div>
                </div>`);
            }
        }
    });

    // Login
    $('#loginSubmit').click(function(e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPwd').val();

        if((email.length < 0 || email === '') || (password.length < 0 || password === '')) {
            alert('Please fill in the fields');
        } else {
            $.get('http://localhost:3000/designers', function(data) {

                for (let i = 0; i < data.length; i++) {
                    if (data[i].email === email && data[i].password === password) {
                        localStorage.setItem('id', JSON.stringify(data[i].id) );
                        return window.location.replace('./userProfile.html');
                    }
                }
                alert('Invalid Credentials');
            });
        }
    })

    //logout
    $('#logout').click(function(e) {
        localStorage.clear();
        window.location.replace('./index.html');
    })

    // To create a new designer
    $('#createDesigner').click(function(e) {
        e.preventDefault();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();
        const password = $('#signupPwd').val();

        if((firstName.length < 0 || firstName === '') || (lastName.length < 0 || lastName === '') || (email.length < 0 || email === '') || (password.length < 0 || password === '')) {
            alert('Please fill in the fields');
            return;
        }

        const data = {
            firstName,
            lastName,
            email,
            password
        }

        var emailExist = false;
        $.get('http://localhost:3000/designers', function(db) {
            console.log(db.length);
            for (let i = 0; i < db.length; i++) {
                console.log(db[i].email);
                console.log(data.email);
                if (db[i].email === data.email) {
                    emailExist = true;
                    // localStorage.setItem('id', JSON.stringify(data[i].id) );
                }
                console.log(emailExist);
                if(emailExist) {
                    alert('User already exist');
                    return;
                } 
            }
            
            // console.log(data);
            $.post("http://localhost:3000/designers", data, function(newUser) {
                alert('User Created Successfully');
                localStorage.setItem('id', JSON.stringify(newUser.id));
                window.location.replace('./userProfile.html');
            });
            
        });    
    })

    // To create a new collection
    $('#createCollection').click(function(e) {
        e.preventDefault();
        const description = $('#designDescription').val();
        const designerId = Number(localStorage.getItem('id'));
        const category = $('#createCategory').val();
        const imageUrl = $('#imgSrc').val();

        console.log(designerId);

        if((description.length < 0 || description === '') || (category.length < 0 || category === '') || (imageUrl.length < 0 || imageUrl === '') ) {
            alert('Please fill in the fields');
            return;
        }

        const data = {
            description,
            designerId,
            category,
            imageUrl
        }   

        // console.log(data);
        $.post("http://localhost:3000/collections", data, function(newUser) {
            localStorage.setItem('collectionId', JSON.stringify(newUser.id));
            // alert('Collection Created Successfully');
            console.log('designerId:', designerId);
            console.log('collectionId:', newUser.id);
        });
    })

    // To navigate to collections html
    $('#nav-collection').click(function(e) {
        e.preventDefault();
        window.location.replace('./collections.html');
    })

    // To navigate to collections html
    $('#nav-profile').click(function(e) {
        e.preventDefault();
        window.location.replace('./userProfile.html');
    })

    // To navigate to collections html
    $('.nav-home').click(function(e) {
        e.preventDefault();
        window.location.replace('./index.html');
    })
})