import sys

def python_func(params):
    print("this is the params:", params)
    return 12

# When this python file invoked, it starts main
if __name__ == "__main__":
# Retrieves the command line arguments passed to the script by the JS function
    params = sys.argv[2:]
    result = python_func(params)
    print(result)