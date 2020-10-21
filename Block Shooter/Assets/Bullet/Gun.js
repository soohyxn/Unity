#pragma strict

var bulletPrefab : GameObject;
var initialVelocity : float;

function TimeUp() {
	enabled = false;
}
function Start () {

}

function Update () {
	if(Input.GetButtonDown("Fire1"))
	{
		var bullet : GameObject = Instantiate(bulletPrefab,transform.position,transform.rotation);
		
		var screenPoint = Input.mousePosition;
		screenPoint.z = 10.0;
		var worldPoint = camera.ScreenToWorldPoint(screenPoint);
		var direction = (worldPoint-transform.position).normalized;
		
		bullet.rigidbody.velocity = direction * initialVelocity;
	}
}