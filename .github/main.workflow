workflow "New workflow" {
  on = "push"
  resolves = ["Deploy"]
}

action "Deploy" {
  uses = "actions/aws/cli@efb074ae4510f2d12c7801e4461b65bf5e8317e6"
  args = "s3 cp . s3://foobar/baz"
}
