# setup-act  

This action sets up the [nektos/act](https://github.com/nektos/act) cli tool  

## Usage  
See [action.yml](action.yml)

### Example
```yaml
steps:
- uses: actions/checkout@v3
- uses: shubhbapna/setup-act
  with:
    default-runner-size: medium
- run: act pull_request
```  

The `default-runner-size` input is used to set the default image (see [here](https://github.com/nektos/act/blob/master/README.md#first-act-run)). This input is optional. By default `medium` image size is used. Moreover, if it's value is neither `micro`, `medium` or `large`, the action will fail.
