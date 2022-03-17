<div class="container rounded bg-white mb-5" id='userProfile'>
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                <span class="font-weight-bold profileName"></span>
                <span class="text-black-50 profileEmail"></span>
                <span class='btn btn-success follow'>follow</span>
            </div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="name" id='name' value="" disabled></div>
                    <!-- <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" value="" placeholder="surname"></div> -->
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">User Name</label><input type="text" class="form-control" placeholder="name" id='username' value="" disabled></div>
                    <!-- <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" value="" placeholder="surname"></div> -->
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels ">Mobile Number</label><input type="text" class="form-control mobile" placeholder="enter phone number" value="" disabled></div>
                    <div class="col-md-12"><label class="labels ">City</label><input type="text" class="form-control city" placeholder="enter address line 1" value="" disabled></div>
                    <!-- <div class="col-md-12"><label class="labels">Address Line 2</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div> -->
                    <div class="col-md-12"><label class="labels">country</label><input type="text" class="form-control country" placeholder="enter country" value="" disabled></div>
                    <div class="col-md-12"><label class="labels">Pin Code</label><input type="text" class="form-control pincode" placeholder="enter pincode" value="" disabled></div>
                    <!-- <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div> -->
                    <!-- <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" id='profileEmail' placeholder="enter email id " value="" disabled></div> -->
                </div>
                <p class="text-danger" id='profileError'></p>
                <!-- <div class="mt-5 text-center"><button class="btn btn-primary profile-button profileSave" type="button">Save Profile</button></div> -->
            </div>
        </div>

        <div class="col-md-4 border-right listFriend" style="display:none">
            <div class="d-flex flex-column align-items-center bg-light border-start shadow-sm text-center p-3 py-5">
                <div style='border-bottom:1px solid gray' class="bg-light">
                    <span class="btn text-danger fw-bold fs-4 ">Muted Friends</span>
                    <div class="mute">
                    </div>
                </div>
                <hr>
                <div style='border-bottom:1px solid gray' class="bg-light">
                    <span class="btn text-success fw-bold fs-4">Unmuted Friends</span>
                    <div class="friends">

                    </div>
                </div>

                <hr>
                <div style='border-bottom:1px solid gray' class="bg-light">
                    <span class="btn text-dark fw-bold fs-4 ">All Users</span>
                    <div class="users">

                    </div>
                </div>


            </div>
        </div>
    </div>
</div>
</div>
</div>