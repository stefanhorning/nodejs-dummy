workflow "On push" {
  on = "push"
  resolves = ["Deploy"]
}

action "Deploy" {
  uses = "actions/aws/cli@efb074ae4510f2d12c7801e4461b65bf5e8317e6"
  args = "s3 cp . s3://foobar/baz"
}

workflow "On PR" {
  on = "pull_request"
  resolves = ["Filters for GitHub Actions"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@46ffca7632504e61db2d4cb16be1e80f333cb859"
}
