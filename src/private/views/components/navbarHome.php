<nav class="navbar sticky-top navbar-expand-sm bg-white shadow-sm">

    <div class="container-fluid pt-3 pb-2 d-flex align-items-center">
        <a href="/" class="text-dark navbar-brand ms-5 px-5">

            <span class=" ms-2 fw-bold fs-3">The</span><span class=" fw-normal fs-3">Circles</span>
        </a>
        <div class="input-group border px-2 py-2" style="border-radius: 30px; width: 40%">
            <input type="text" class="form-control border-0" id='searchInput' placeholder="Search" />
            <button class="btn rounded text-dark fw-bold pe-4 btnSearch" href="#">
                <i class="fa fa-search "></i>
            </button>
        </div>
        <ul class="navbar-nav">
            <li class="nav-item px-1">
                <button class="btn profile text-dark fw-bold">Profile</button>
            </li>
            <li class="nav-item px-1">
                <a href="/pages/authentication">
                    <button class="btn btn-dark rounded authButton">Sign In</button>
                </a>
            </li>
        </ul>
    </div>
</nav>
<div class="row result shadow-sm" style="display:none">
</div>