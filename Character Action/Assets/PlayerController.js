#pragma strict

var walkSpeed : float = 3.0;
var gravity : float = 20.0;
var jumpSpeed : float = 8.0;

private var velocity : Vector3;

function Start () {
	animation["Walk"].speed = 2.0;
}

function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	if(controller.isGrounded)
	{
		velocity = Vector3(Input.GetAxis("Horizontal"),0,Input.GetAxis("Vertical"));
		velocity *= walkSpeed;
		
		if(Input.GetButtonDown("Jump"))
		{
			velocity.y = jumpSpeed;
			animation.Play("Jump");
		} else if(velocity.magnitude > 0.5)
		{
			animation.CrossFade("Walk",0.1);
			transform.LookAt(transform.position + velocity);
		} else 
		{
			animation.CrossFade("Idle",0.1);
		}
	}
	velocity.y -= gravity * Time.deltaTime;
	controller.Move(velocity * Time.deltaTime);
}