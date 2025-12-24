
def check_braces(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    stack = []
    for i, line in enumerate(lines):
        for j, char in enumerate(line):
            if char == '{':
                stack.append((i + 1, j + 1))
            elif char == '}':
                if not stack:
                    print(f"Extra closing brace at line {i+1}, col {j+1}")
                    return
                stack.pop()
    
    if stack:
        print(f"Unclosed braces found ({len(stack)}):")
        for line, col in stack:
            print(f"  Line {line}, col {col}")
            # print snippet
            print(f"  -> {lines[line-1].strip()}")
    else:
        print("Braces are balanced!")

check_braces('src/app/globals.css')
