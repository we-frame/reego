const fail = () => {
    return (
        <>
            <div className="jumbotron text-center height: 100%;">
                <h1 className="display-3">Transaction Failed !</h1>
                <p className="lead">
                    <a className="btn btn-primary btn-sm bg-danger text-light btn-outline-danger" href="/" role="button" >Continue to Home</a>
                </p>
            </div>
        </>
    );
}

export default fail;