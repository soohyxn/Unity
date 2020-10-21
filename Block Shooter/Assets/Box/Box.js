#pragma strict
var colorName : String;
var explosionPrefab : GameObject;

private var hit : boolean;
private var killIimer : float;

function Start () {
	hit = false;
}
function YouAreHit() {
	if(!hit)
	{
		hit = true;
		killIimer = 0.4;
		
		rigidbody.AddForce(Vector3.up * 15.0, ForceMode.Impulse);
	}
}
function Update () {
	if(!hit)
		return;
		
	killIimer -= Time.deltaTime;
	if(killIimer <= 0.0)
	{
		var gameController : GameObject = GameObject.FindWithTag("GameController");
		gameController.SendMessage("OnDestroyBox",colorName);
		Instantiate(explosionPrefab, transform.position, transform.rotation);
		Destroy(gameObject);
	}
}
